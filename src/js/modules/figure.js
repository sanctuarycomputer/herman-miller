import Assetable from 'herman-miller/modules/assetable';
import { random } from 'herman-miller/modules/utils';

class Figure extends Assetable{
  constructor(props) {
    super(...arguments)
    this.state['facing'] = 'left';
    this.state['figureState'] = 'idle';
    this.state['figureLoop'] = '';
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
      left: '-70%'
    },
    '100%': {
      left: '170%'
    }
  });

  startLooking = () => {
    this.setState({
      figureLoop: 'looking'
    });
    let lookLength = random(5000, 9000);
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
      width: '160px',
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
      animationDelay: `${ 15 + this.props.position * 15}s`,
      backgroundImage: this.walkCycle,
      animationName: this.figureAnimation,
      animationDuration: '15s',
      animationTimingFunction: 'linear',
      animationDirection: 'alternate-reverse',
      WebkitTransform: 'translate3d(0,0,0)',
      WebkitBackfaceVisibility: 'hidden'
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
      ]}></div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Figure);
