import Interactable from 'herman-miller/modules/interactable';

class Wheel extends Interactable {
  constructor(props) {
    super(...arguments);
    this.state['wheelLifecycle'] = 'idle';

    let style = this.wheelStyle.base;
    let [w, h] = this.props.widthHeightVmins;
    
    style.width = `${w}vmin`;
    style.height = `${h}vmin`;
    style.marginRight = `${w/10}vmin`;
    style.marginBottom = `${h/10}vmin`;

    style.position = (h === w) ? 'relative' : 'absolute';
  }

  componentDidMount() {
    super.componentDidMount();
    let el = React.findDOMNode(this);
    
    this.setState({
      styles: {
        position: 'absolute',
        left: `${el.offsetLeft}px`,
        top: `${el.offsetTop}px`
      }
    });
  }

  spinAnimation = Radium.keyframes({
    '0%': {transform: 'rotate(0deg)'},
    '100%': {transform: 'rotate(360deg)'}
  })

  wheelStyle = {
    base: {
      borderRadius: '100%',
      display: 'inline-block',
      verticalAlign: 'top',
    },
    inner: {
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      top: '0',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${this.state.assets[0]})`,
    },
    active: {
      animationName: this.spinAnimation,
      animationDelay: '0s',
      animationDirection: 'normal',
      animationDuration: '8s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out'
    }
  }

  onClick() {
    this.setState({
      wheelLifecycle: this.state.wheelLifecycle === 'idle' ? 'active' : 'idle'
    })
  }
}

export default Wheel;
