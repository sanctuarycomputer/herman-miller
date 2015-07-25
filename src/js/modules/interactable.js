import { onDrag, onResize } from 'herman-miller/modules/utils';
import Assetable from 'herman-miller/modules/assetable';

const {
  findDOMNode
} = React;

const {
  bool
} = React.PropTypes;

/*
 * Assetable Interface
 *
 * draggable: bool
 * resizable: bool
 */
class Interactable extends Assetable {
  static propTypes = {
    draggable:        bool,
    resizable:        bool
  }

  constructor(props) {
    super(...arguments);
    this.state['draggable'] = props.draggable;
    this.state['resizable'] = props.resizable;
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
