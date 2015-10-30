import Artboard from 'herman-miller/modules/artboard';
import Loader from 'herman-miller/modules/loader';
import Viewport from 'herman-miller/modules/viewport';


class Global {
  constructor(element) {
    this.ready                    = false;
    this._allComponentsRegistered = false;
    this.readyStack               = [];
    this.preScreenshotStack       = [];
    this.postScreenshotStack      = [];
    this.toggleInfoStack          = [];
    this.readyStack               = [];
    this.boxOpenStack             = [];
    this.boxClickedStack          = [];
    this.element                  = element;
    this.assetPath                = `${element.dataset.assetPath}assets`;
    this.locale                   = `${element.dataset.localeCode}` || "en";
    this.translations             = this._setupTranslations();
    this.loader                   = new Loader();
    this.registry                 = [];
    this.infoScreenActive         = false;
  }

  _setupTranslations() {
    let i18n = window.eamesInteractiveStoryTranslations;
    
    if (!i18n) {
      throw new Error("Eames Interactive: The window.eamesInteractiveStoryTranslations object is undefined.");
    } else if (!i18n[this.locale]) {
      throw new Error(`Eames Interactive: The window.eamesInteractiveTranslations object does not define the ${this.locale} locale.`);
    }

    return i18n[this.locale];
  }
  
  boxClicked() {
    this.boxClickedStack.map(callback => {
      callback();
    });
  }

  onBoxClick(callback) {
    this.boxClickedStack.push(callback);
  }

  toggleInfo() {
    this.toggleInfoStack.map(callback => {
      callback();
    });
  }

  onToggleInfo(callback) {
    this.toggleInfoStack.push(callback);
  }

  start() {
    React.render(<Viewport seed={1} format={'background'} assetFormat={'jpg'} />, this.element);
  }

  screenshot() {
    this.didStartScreenshot();
    html2canvas(this.element, { width: 980, height: 551}).then(canvas => {
      let blob = canvas.toDataURL('image/jpeg', 1);
      download(blob, "Herman-Miller-Screengrab.jpg", "image/jpeg");
      this.didCompleteScreenshot();
    });
  }
  
  didStartScreenshot() {
    this.preScreenshotStack.map(callback => {
      callback();
    });
  }
  
  didCompleteScreenshot() {
    this.postScreenshotStack.map(callback => {
      callback();
    });
  }

  willScreenshot(callback) {
    this.preScreenshotStack.push(callback);
  }
  
  didScreenshot(callback) {
    this.postScreenshotStack.push(callback);
  }

  onReady(callback) {
    this.readyStack.push(callback);
  }
  
  didBecomeReady() {
    this.readyStack.map(callback => {
      callback();
    });
  }

  onBoxOpen(callback) {
    this.boxOpenStack.push(callback);
  }

  boxWillOpen() {
    let background = new Howl(
      {urls: [`${this.assetPath}/sound/main_loop.mp3`],
      buffer: true,
      loop: true})

    background.play()
    this.boxOpenStack.map(callback => {
      callback();
    });

  }

  advanceReadiness() {
    this._allComponentsRegistered = true;
    this._checkIfReady();
  }

  addComponentToRegistry(key) {
    this.registry.push({
      key: key,
      firstAssetLoaded: false,
      allAssetsLoaded: false
    });
  }

  setRegistryState(key, stateObj) {
    let item = this.registry.filter(item => { return item.key === key })[0];
    
    if (!item) {
      throw new Error(`You are attempting to set registry state for undefined key: ${key}`);
    }

    for (let attr in stateObj) {
      if (stateObj.hasOwnProperty(attr)) {
        item[attr] = stateObj[attr];
      }
    }

    this._checkIfReady();
  }

  getSolidObjects(excludedKey) {
    return this.registry.filter(function(item) { 
      return (item.solid && (item.key !== excludedKey));
    });
  }

  _checkIfReady() {
    this.ready = this.registry
                     .map(item => { return item.firstAssetLoaded })
                     .every(bool => { return bool === true });

    if (this.ready && this._allComponentsRegistered) {
      this.didBecomeReady();
    }
  }
}

export default Global;
