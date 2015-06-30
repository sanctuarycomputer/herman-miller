import { onDrag, onResize } from 'herman-miller/modules/utils';

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
