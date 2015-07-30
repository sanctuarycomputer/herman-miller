import { onDrag, onResize } from 'herman-miller/modules/utils';

const {
  Component
} = React;

const {
  bool,
  array,
  number,
  string
} = React.PropTypes;

/*
 * Assetable Interface
 *
 * seed: number
 * format: string
 * assetCount: number (defaults to 1)
 * assetFormat: string (defaults to 'gif')
 */

class Assetable extends Component {
  static propTypes = {
    seed:             number,
    assetCount:       number,
    assetFormat:      string,
    assets:           array,
    format:           string,
    key:              string,
    firstAssetLoaded: bool,
    allAssetsLoaded:  bool
  }

  constructor(props) {
    super(...arguments);
    const Global = window.eamesInteractive;

    let seed = props.seed || 1;
    let format = props.format;
    if (!format) {
      let [w = 0, h = 0] = props.widthHeightVmins;
      format = (w == h) ? 'square' : (w > h) ? 'horiz' : 'vert';
    }

    let assetCount = props.assetCount || 1;
    let assetFormat = props.assetFormat || 'gif';

    this.state = {
      seed,
      format,
      assetCount,
      assetFormat,
      lifecycle:        'loading',
      assets:           this._buildAssetPaths(seed, format, assetCount, assetFormat),
      key:              `${format}-${seed}`,
      firstAssetLoaded: false,
      allAssetsLoaded:  false
    }

    Global.addComponentToRegistry(this.state.key);
    Global.onReady(() => {
      this.setState({ lifecycle: 'ready' });
    });

    let assetPromiseHash = Global.loader.loadPaths(this.state.assets);

    assetPromiseHash.firstAssetLoaded.then(() => {
      this.setState({ firstAssetLoaded: true });
      Global.setRegistryState(this.state.key, {
        firstAssetLoaded: true
      });
    }).catch(() => {
      console.log(`${this.state.key} Failed to load its first asset.`);
    });

    assetPromiseHash.allAssetsLoaded.then(() => {
      this.setState({ allAssetsLoaded: true });
      Global.setRegistryState(this.state.key, {
        allAssetsLoaded: true
      });
    }).catch(() => {
      console.log(`${this.state.key} Failed to load some of its assets.`);
    });
  }

  _buildAssetPaths(seed, format, assetCount, assetFormat) {
    let paths    = [];
    let basePath = window.eamesInteractive.assetPath;

    for (let i = 1; i <= assetCount; i++) { 
      paths.push(`${basePath}/${format}/0${seed}0${i}.${assetFormat}`);
    }

    return paths;
  }
}

export default Assetable;
