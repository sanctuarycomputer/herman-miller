import Assetable from 'herman-miller/modules/assetable';
import { onDrag, onDragEnd, onResize, onResizeStart, onResizeEnd } from 'herman-miller/modules/utils';

const {
  findDOMNode
} = React;

// Set global resizing handle margin:
interact.margin(30);

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
    draggable: bool,
    resizable: bool
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
          restriction: "body",
          endOnly: false, // element always stays within the bounds
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 } // 0-1 relative bounds of the _interactable_ within the restriction element
        },
        onmove: onDrag.bind(this),
        onend: onDragEnd.bind(this)
      });
    }
      
    if (this.state.resizable) {
      interactable.resizable({
        restriction: "body",
        square: true, // keep 1:1 aspect ratio
        endOnly: false, // element always stays within the bounds
        edges: { top: false, left: false, right: true, bottom: true }
      })
      .on('resizestart', onResizeStart.bind(this))
      .on('resizemove', onResize.bind(this))
      .on('resizeend', onResizeEnd.bind(this));
    }
  }
}

export default Interactable;
