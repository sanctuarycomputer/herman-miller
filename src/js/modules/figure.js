import Assetable from 'herman-miller/modules/assetable';
import { random } from 'herman-miller/modules/utils';

class Figure extends Assetable{
  constructor(props) {
    super(...arguments)
    this.state['number'] = props.number
  }

  figureAnimation = Radium.keyframes({
    '0%': {left: '0'},
    '100%': {
      left: '100%'
    }
  });

  callfunction = () => {
  };

  componentDidMount() {
    var element = React.findDOMNode(this);
    element.addEventListener("animationiteration", this.callfunction, false);
  }

  style = {
    base: {
      width: '200px',
      height: '200px',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      bottom: 0,
      left: 0,
      position: 'absolute',
      animationIterationCount: 'infinite',
      animationPlayState: 'running',
      animationFillMode: 'backwards',
      ':hover': {
        animationPlayState: 'paused',
      }
    },

    1: {
      backgroundImage: `url(${this.state.assets[0]})`,
      animationName: this.figureAnimation,
      animationDuration: '6s',
      animationTimingFunction: 'linear',
      animationDirection: 'alternate-reverse',
      animationDelay: '1s',
      ':hover': {
        backgroundImage: `url(${this.state.assets[1]})`
      }
    }
  }

  render() {
    return (
      <div style={[this.style.base, this.style[this.state.number]]}></div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Figure);
