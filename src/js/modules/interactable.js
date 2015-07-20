import { onDrag, onResize } from 'herman-miller/modules/utils';

const {
  findDOMNode,
  Component
} = React;

const {
  bool,
  array,
  string
} = React.PropTypes;

class Interactable extends Component {
  static propTypes = {
    draggable: bool,
    resizable: bool,
    assets:    array,
    format:    string
  }

  constructor(props) {
    super(...arguments);
    this.state = {
      draggable: props.draggable,
      resizable: props.resizable,
      assets: this._buildAssetPaths(props.seed, props.format)
    }
  }

  _buildAssetPaths(seed, format) {
    let paths    = [];
    let basePath = window.eamesInteractive.assetPath;

    for (let i = 1; i < 6; i++) { 
      paths.push(`${basePath}/${format}/0${seed}0${i}.gif`);
    }

    return paths;
  }

  componentDidMount() {
    let interactable = interact(findDOMNode(this));
    
    if (this.state.draggable) {
      interactable.draggable({
        inertia: true,
        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        onmove: onDrag
      });
    }
      
    if (this.state.resizable) {
      interactable.resizable({
        edges: { left: true, right: true, bottom: true, top: true }
      }).on('resizemove', onResize);
    }
  }
}

export default Interactable;
