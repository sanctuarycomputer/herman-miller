class Loader {
  constructor() {
    this.stack = {
      0: []
    };
  }

  loadPaths(pathArray) {
    let hash = {
      firstAssetLoaded: null,
      allAssetsLoaded: [] 
    } 

    for (let i = 0; i < pathArray.length; i++) {
      if (!this.stack[i]) {
        this.stack[i] = []
      }

      let promise = this._loadPath(pathArray[i]);

      if (i === 0) {
        hash.firstAssetLoaded = promise; 
      }

      promise.then((image) => {
        this._removePromiseFromStack(promise, i);
      });

      hash.allAssetsLoaded.push(promise);
      this.stack[i].push(promise);
    }

    hash.allAssetsLoaded = RSVP.all(hash.allAssetsLoaded);
    return hash;
  }
  
  _loadPath(path) {
    return new RSVP.Promise((resolve, reject) => {
      let image = new Image();
      image.src = path;
      
      if (image.complete) {
        resolve(image);
        return; // don't make unneeded listeners
      }
      image.onload = () => {
        image.onload = null;
        resolve(image);
      }
      image.onerror = () => {
        image.onerror = null;
        reject(`Asset: ${path} did not load.`);
      }
    });
  }

  _removePromiseFromStack(promise, stackId) {
    this.stack[stackId] = this.stack[stackId].filter((item) => {
      return item._guidKey !== promise._guidKey;
    });
  }
}

export default Loader;
