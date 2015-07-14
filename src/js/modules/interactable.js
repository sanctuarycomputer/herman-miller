import { onDrag, onDragEnd, onResize, onResizeStart, onResizeEnd } from 'herman-miller/modules/utils';

// Set global resizing handle margin:
interact.margin(30);

class Interactable extends React.Component {
  static propTypes = {
    draggable: React.PropTypes.bool,
    resizable: React.PropTypes.bool
  }

  constructor(props) {
    super(...arguments);
    this.state = {
      draggable: props.draggable,
      resizable: props.resizable
    }
  }

  componentDidMount() {
    let interactable = interact(React.findDOMNode(this));
    
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
