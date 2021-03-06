class Loader {
  constructor() {
    this.stack = {
      0: []
    };
    this.promiseCache = {};
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
      
      let promise;
      if (this.promiseCache[pathArray[i]]) {
        promise = this.promiseCache[pathArray[i]];
        hash.firstAssetLoaded = promise;
        hash.allAssetsLoaded.push(promise);
      } else {
        promise = this._loadPath(pathArray[i]);

        if (i === 0) {
          hash.firstAssetLoaded = promise; 
        }

        promise.then((image) => {
          this._removePromiseFromStack(promise, i);
        });

        hash.allAssetsLoaded.push(promise);

        this.stack[i].push(promise);
        this.promiseCache[pathArray[i]] = promise;
      }
    }

    hash.allAssetsLoaded = RSVP.all(hash.allAssetsLoaded);
    return hash;
  }
  
  _loadPath(path) {
    return new RSVP.Promise((resolve, reject) => {
      let image = new Image();
      image.onload = () => {
        resolve(image);
      }
      image.onerror = () => {
        reject(`Asset: ${path} did not load.`);
      }
      image.src = path;

      if (image.complete) {
        resolve(image);
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
