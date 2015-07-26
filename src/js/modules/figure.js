import Assetable from 'herman-miller/modules/assetable';
import { random } from 'herman-miller/modules/utils';

class Figure extends Assetable{
  constructor(props) {
    super(...arguments)
    this.state['facing'] = 'left';
    this.state['figureState'] = 'idle';
    this.state['figureLoop'] = 'walking';

    const Global = window.eamesInteractive;
    Global.onBoxOpen(() => {
      this.setState({
        figureState: 'active' 
      });
      // Start the Looking/Walking Loop
      let nextLook = random(6000, 10000);
      window.setTimeout(this.startLooking, nextLook);
    });
  }

  walkCycle = `url(${this.state.assets[0]})`;
  lookCycle = `url(${this.state.assets[1]})`;

  figureAnimation = Radium.keyframes({
    '0%': {
      left: '-45%'
    },
    '100%': {
      left: '145%'
    }
  });

  startLooking = () => {
    this.setState({
      figureLoop: 'looking'
    });
    let lookLength = random(6000, 10000);
    window.setTimeout(this.stopLooking, lookLength);
  }

  stopLooking = () => {
    this.setState({
      figureLoop: 'walking'
    });
    let walkLength = random(6000, 10000);
    window.setTimeout(this.startLooking, walkLength);
  }

  changeDirection = () => {
    this.setState({
      facing: this.state.facing === 'left' ? 'right' : 'left'
    });
  };

  componentDidMount() {
    var element = React.findDOMNode(this);
    element.addEventListener("animationiteration", this.changeDirection, false);
  }

  style = {
    base: {
      width: '240px',
      height: '240px',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      bottom: 0,
      left: '-45%',
      opacity: '0',
      position: 'absolute',
      animationIterationCount: 'infinite',
      animationPlayState: 'running',
      animationFillMode: 'backwards',
      backgroundImage: this.walkCycle,
      animationName: this.figureAnimation,
      animationDuration: '18s',
      animationTimingFunction: 'linear',
      animationDirection: 'alternate-reverse',
    },

    1: {
      transition: '1s opacity 12s',
      animationDelay: '12s'
    },
    
    2: {
      transition: '1s opacity 18s',
      animationDelay: '18s'
    },

    looking: {
      animationPlayState: 'paused',
      backgroundImage: this.lookCycle
    },

    active: {
      opacity: '1',
    },

    right: {
      transform: 'scaleX(-1)',
      filter: 'FlipH'
    }

  }

  render() {
    return (
      <div style={[
        this.style.base, 
        this.style[this.state.facing],
        this.style[this.state.figureState],
        this.style[this.state.figureLoop],
        this.style[this.state.seed]
      ]}></div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Figure);
