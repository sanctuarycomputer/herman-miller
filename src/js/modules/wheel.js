import Interactable from 'herman-miller/modules/interactable';
import { random } from 'herman-miller/modules/utils';

const {
  findDOMNode
} = React;

class Wheel extends Interactable {
  constructor(props) {
    super(...arguments);
    this.state['wheelLifecycle'] = 'active';
    this.state['wheelIndex'] = props.wheelIndex;

    this.width = 100;
    this.height = 100;
    switch(this.props.wheelIndex) {
      case 1:
        this.x = 300;
        this.y = 176;
        break;
      case 2:
        this.x = 300;
        this.y = 76;
        break;
      case 3:
        this.x = 400;
        this.y = 76;
        break;
    }
  }

  spinAnimation = Radium.keyframes({
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  })

  wheelStyle = {
    base: {
      width: '100px',
      cursor: 'pointer',
      height: '100px',
      borderRadius: '100%',
      position: 'absolute'
    },
    wheel1: {
      transform: 'translate3d(300px, 176px, 0px)'
    },
    wheel2: {
      transform: 'translate3d(300px, 76px, 0px)'
    },
    wheel3: {
      transform: 'translate3d(400px, 76px, 0px)'
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
    idle: {
      transform: 'rotate(0deg)'
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
    const Sound = window.Sound;
    let index = Math.round(random(1, 10));
    Sound.single[index].play();

    this.setState({
      wheelLifecycle: this.state.wheelLifecycle === 'idle' ? 'active' : 'idle'
    })
  }
}

export default Wheel;
