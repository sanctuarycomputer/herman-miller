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
    let assetCount = props.assetCount || 1;
    let assetFormat = props.assetFormat || 'gif';

    this.state = {
      seed,
      assetCount,
      assetFormat,
      lifecycle:        'loading',
      assets:           this._buildAssetPaths(seed, props.format, assetCount, assetFormat),
      format:           props.format,
      key:              `${props.format}-${seed}`,
      firstAssetLoaded: false,
      allAssetsLoaded:  false
    }

    let uniqueKey = Global.registry.filter(item => { return item.key === this.state.key }).length === 0 ? true : false;

    if (!uniqueKey) {
      this.state.key = `${this.state.key}-${Date.now()}`;
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
