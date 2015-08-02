import Assetable from 'herman-miller/modules/assetable';
import { random } from 'herman-miller/modules/utils';

class Figure extends Assetable{
  constructor(props) {
    super(...arguments)
    this.state['facing'] = 'left';
    this.state['figureState'] = 'idle';
    this.state['figureLoop'] = '';
    this.state['animationLoop'] = '';
    this.state['animationStart'] =  15 + (this.props.position * 15)


    const Global = window.eamesInteractive;
    Global.onBoxOpen(() => {
      this.setState({
        figureState: 'active'
      });
      // Start the Looking/Walking Loop
      let firstLook = this.state['animationStart'] * 1000;
      window.setTimeout(this.startLooking, firstLook);
    });
  }


  walkCycle = `url(${this.state.assets[0]})`;
  lookCycle = `url(${this.state.assets[1]})`;

  figureAnimation = Radium.keyframes({
    '0%': {
      left: '0'
    },
    '100%': {
      left: '980px'
    }
  });

  lookAnimation = Radium.keyframes({
    '0%': {
      backgroundPosition: "0px"
    },
    '100%': {
      backgroundPosition: "-16850px"
    }
  });

  walkAnimation = Radium.keyframes({
    '0%': {
      backgroundPosition: "0px"
    },
    '100%': {
      backgroundPosition: "-2875px"
    }
  });

  startLooking = () => {
    this.setState({
      figureLoop: 'looking',
      animationLoop: 'lookingAnimation'
    });
    let lookLength = random(5000, 9000);
    window.setTimeout(this.stopLooking, lookLength);
  }

  stopLooking = () => {
    this.setState({
      figureLoop: 'walking',
      animationLoop: 'walkingAnimation'
    });
    let walkLength = random(6000, 10000);
    window.setTimeout(this.startLooking, walkLength);
  }

  changeDirection = (event) => {
    if(event.path.length === 8){
      this.setState({
        facing: this.state.facing === 'left' ? 'right' : 'left'
      });
    }
  };

  componentDidMount() {
    var element = React.findDOMNode(this);
    element.addEventListener("animationiteration", this.changeDirection, false);
  }

  style = {
    base: {
      width: '125px',
      height: '160px',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      bottom: 0,
      left: '0',
      zIndex: '10',
      opacity: '0',
      position: 'absolute',
      animationIterationCount: 'infinite',
      animationPlayState: 'running',
      animationFillMode: 'backwards',
      transition: `1s opacity ${0 + this.props.position * 15 }s`,
      animationDelay: `${ 0 + this.props.position * 15}s`,
      animationName: this.figureAnimation,
      animationDirection: 'alternate-reverse',
      animationDuration: '15s',
      animationTimingFunction: 'linear'
    },
    lookingAnimation: {
      animation: `${this.lookAnimation} 10s steps(135) infinite`,
      background: `${this.lookCycle} left center`,
      width: '125px',
      height: '160px'
    },
    walkingAnimation: {
      animation: `${this.walkAnimation} 1.35s steps(23) infinite`,
      background: `${this.walkCycle} left center`,
      width: '125px',
      height: '160px'
    },

    looking: {
      animationPlayState: 'paused',
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
        ]}>

          <div style={[this.style[this.state.animationLoop]]}></div>
        </div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Figure);
