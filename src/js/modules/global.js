import Artboard from 'herman-miller/modules/artboard';
import Loader from 'herman-miller/modules/loader';
import Viewport from 'herman-miller/modules/viewport';
import Sound from 'herman-miller/modules/sound';

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
    this.isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
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
    if (this.isIE) {
      this._buildBrowserError();
    } else {
      // Load Sounds
      this.Sound = new Sound();
      // Start Experience
      React.render(<Viewport seed={1} format={'background'} assetFormat={'jpg'} />, this.element);
    }
  }

  _buildBrowserError() {
    let image = document.createElement('img');
    image.src = `${this.assetPath}/upgrade/0101.jpg`;

    image.setAttribute('style', 'width: 980px; height: 551px;');
    image.style.width  = '980px';
    image.style.height = '551px';
    
    let firstLine     = document.createElement('H2');
    let firstLineText = document.createTextNode(this.translations.ieErrorA);
    firstLine.appendChild(firstLineText);
    
    let secondLine     = document.createElement('H2');
    let secondLineText = document.createTextNode(this.translations.ieErrorB);
    secondLine.appendChild(secondLineText);
    
    let textContainer = document.createElement('DIV');
    textContainer.appendChild(firstLine);
    textContainer.appendChild(secondLine);

    textContainer.setAttribute('style', `
      position: absolute;
      width: 980px;
      text-align: center;
      font-family: 'ff-meta-web-pro', Helvetica, Arial, sans-serif;
      color: white;
      top: 200px;
    `)
    textContainer.style.position       = 'absolute';
    textContainer.style.width          = '980px';
    textContainer.style['text-align']  = 'center';
    textContainer.style['font-family'] = "'ff-meta-web-pro', Helvetica, Arial, sans-serif";
    textContainer.style.color          = 'white';
    textContainer.style.top            = '200px';

    this.element.appendChild(textContainer);
    this.element.appendChild(image)
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
