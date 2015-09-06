import Assetable from 'herman-miller/modules/assetable';
import { random } from 'herman-miller/modules/utils';

class Figure extends Assetable{
  currentTimeout = null;

  constructor(props) {
    super(...arguments)
    this.state['facing'] = 'right';
    this.state['figureState'] = 'idle';
    this.state['figureLoop'] = '';
    this.state['animationLoop'] = '';
    this.state['figureVisibility'] = 'visible';
    this.state['animationStart'] =  10 + (this.props.position * 15)

    const Global = window.eamesInteractive;
    Global.onBoxOpen(() => {
      this.setState({
        figureState: 'active'
      });
      // Start the Looking/Walking Loop
      let firstLook = this.state['animationStart'] * 1000;
      this.currentTimeout = window.setTimeout(this.startLooking, firstLook);
    });
    
    Global.willScreenshot(() => {
      this.setState({
        figureVisibility: 'hidden' 
      });
    });

    Global.didScreenshot(() => {
      this.setState({
        figureVisibility: 'visible' 
      });
    });

    window.tabActive(() => {
      let active = window.tabActive();
      if (active) {
        window.clearTimeout(this.currentTimeout);
        this.currentTimeout = null; 
        this.stopLooking();
        this.ensureFigureDirection();
      } else {
        this.startLooking(true); 
      }
    })
  }
  
  // Hacks to ensure figure is facing the
  // correct direction
  sample1 = 0;
  sample2 = 0;
  ensureFigureDirection() {
    let node = React.findDOMNode(this);
    this.sample1 = node.getBoundingClientRect().left;
    window.setTimeout(this.collectSample.bind(this), 100);
  }

  collectSample() {
    let node = React.findDOMNode(this);
    this.sample2 = node.getBoundingClientRect().left;

    let diff = this.sample2 - this.sample1;;
    if (diff > 0) {
      this.setState({
        facing: 'right' 
      });
    } else if (diff < 0) {
      this.setState({
        facing: 'left' 
      });
    }   
    this.sample1 = 0;
    this.sample2 = 0;
  }
  // Hacks Over

  walkCycle = `url(${this.state.assets[0]})`;
  lookCycle = `url(${this.state.assets[1]})`;

  figureAnimation = Radium.keyframes({
    '0%': {
      left: '-350px'
    },

    '100%': {
      left: '1200px'
    }
  });

  lookAnimation = Radium.keyframes({
    '0%': {
      backgroundPosition: "0px"
    },
    '100%': {
      backgroundPosition: "-16750px"
    }
  });

  walkAnimation = Radium.keyframes({
    '0%': {
      backgroundPosition: "0px"
    },
    '100%': {
      backgroundPosition: "-2750px"
    }
  });

  startLooking = (noTimeout) => {
    this.setState({
      figureLoop: 'looking',
      animationLoop: 'lookingAnimation'
    });
    let lookLength = random(4000, 12000);
    if (!noTimeout) {
      this.currentTimeout = window.setTimeout(this.stopLooking, lookLength);
    }
  }

  stopLooking = () => {
    this.setState({
      figureLoop: 'walking',
      animationLoop: 'walkingAnimation'
    });
    let walkLength = random(8000, 13000);
    this.currentTimeout = window.setTimeout(this.startLooking, walkLength);
  }

  changeDirection = (event) => {
    if (event.path.length === 8){
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
      transition: `1s opacity ${15 + this.props.position * 15 }s`,
      animationDelay: `${15 + this.props.position * 15}s`,
      animationName: this.figureAnimation,
      animationDirection: 'alternate',
      animationDuration: '22s',
      animationTimingFunction: 'linear',
      pointerEvents: 'none'
    },
    lookingAnimation: {
      animation: `${this.lookAnimation} 10s steps(134, end) infinite`,
      background: `${this.lookCycle} left center`,
      width: '125px',
      height: '160px'
    },
    walkingAnimation: {
      animation: `${this.walkAnimation} 1.35s steps(22, end) infinite`,
      background: `${this.walkCycle} left center`,
      width: '125px',
      height: '160px'
    },
    looking: {
      animationPlayState: 'paused'
    },
    active: {
      opacity: '1'
    },
    right: {
      transform: 'scaleX(-1)'
    },
    visible: {
      visibility: 'visible' 
    },
    hidden: {
      visibility: 'hidden' 
    }
  }

  render() {
    return (
      <div style={[
        this.style.base,
        this.style[this.state.facing],
        this.style[this.state.figureState],
        this.style[this.state.figureLoop],
        this.style[this.state.figureVisibility]
      ]}>

        <div style={[this.style[this.state.animationLoop]]}></div>
      </div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Figure);
