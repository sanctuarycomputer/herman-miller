import Interactable from 'herman-miller/modules/interactable';

class Wheel extends Interactable {
  constructor(props) {
    super(...arguments);
    this.state['lifecycle'] = 'idle';
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
      width: '20vmin',
      height: '20vmin',
      borderRadius: '100%',
      position: 'absolute'
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
      lifecycle: this.state.lifecycle === 'idle' ? 'active' : 'idle'
    })
  }
}

export default Wheel;
