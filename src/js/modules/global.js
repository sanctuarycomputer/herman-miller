import Artboard from 'herman-miller/modules/artboard';
import Loader from 'herman-miller/modules/loader';
import Viewport from 'herman-miller/modules/viewport';


class Global {
  constructor(element) {
    this.ready                    = false;
    this._allComponentsRegistered = false;
    this.readyStack               = [];
    this.boxOpenStack             = [];
    this.element                  = element;
    this.assetPath                = `${window.location.href}assets`;
    this.loader                   = new Loader();
    this.registry                 = [];
  }

  start() {
    React.render(<Viewport seed={1} format={'background'} assetFormat={'jpg'} />, this.element);
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
