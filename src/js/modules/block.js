import Interactable from 'herman-miller/modules/interactable';

const {
  findDOMNode
} = React;

class Block extends Interactable {
  animating = false;

  constructor(props) {
    super(...arguments);
    this.state['currentAsset'] = 1;
    this.state['blockLifecycle'] = 'idle';
    this.state['nextAsset'] = 2;
    
    // This could all be way nicer but we gotta ship this thing on monday
    switch(this.state.format) {
      case 'horiz':
        console.log('horiz');
        this.x = 500;
        this.y = 371;
        break;
      case 'vert':
        this.x = 500;
        this.y = 171;
        break;
      default:
        switch(this.state.seed) {
          case 1:
            this.x = 600;
            this.y = 271;
            break;
          case 2:
            this.x = 600;
            this.y = 171;
            break;
          case 3:
            this.x = 600;
            this.y = 71;
            break;
          case 4:
            this.x = 400;
            this.y = 371;
            break;
          case 5:
            this.x = 300;
            this.y = 371;
            break;
          case 6:
            this.x = 400;
            this.y = 271;
            break;
        }
    }
  }

  style = {
    square1: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(600px, 271px, 0px)'
    },
    square2: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(600px, 171px, 0px)'
    },
    square3: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(600px, 71px, 0px)'
    },
    square4: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(400px, 371px, 0px)'
    },
    square5: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(300px, 371px, 0px)'
    },
    square6: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(400px, 271px, 0px)'
    },
    horiz1: {
      width: "200px",
      height: "100px",
      transform: 'translate3d(500px, 371px, 0px)'
    },
    vert1: {
      width: "100px",
      height: "200px",
      transform: 'translate3d(500px, 171px, 0px)'
    },
    base: {
      position: 'absolute',
      overflow: 'hidden',
    },
    child: {
      width: '100%',
      height: '100%',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      top: '0px',
      left: '0px'
    },
    idleInitialChild: {
      transform: 'translateX(0%)'
    },
    activeInitialChild: {
      transform: 'translateX(-100%)',
      transition: '1s all'
    },
    idleOffsetChild: {
      transform: 'translateX(100%)'
    },
    activeOffsetChild: {
      transform: 'translateX(0%)',
      transition: '1s all'
    },
    1: {
      backgroundImage: `url(${this.state.assets[0]})` 
    },
    2: {
      backgroundImage: `url(${this.state.assets[1]})` 
    },
    3: {
      backgroundImage: `url(${this.state.assets[2]})` 
    },
    4: {
      backgroundImage: `url(${this.state.assets[3]})` 
    },
    5: {
      backgroundImage: `url(${this.state.assets[4]})` 
    },
    6: {
      backgroundImage: `url(${this.state.assets[5]})` 
    }
  }

  onClick() {
    if (!this.animating) {
      this.animating = true;
      let element = findDOMNode(this).querySelector('.initial');

      element.addEventListener("webkitTransitionEnd", this.didFinishAnimating.bind(this, element), true);
      element.addEventListener("transitionend", this.didFinishAnimating.bind(this, element), true);
      element.addEventListener("otransitionend", this.didFinishAnimating.bind(this, element), true);

      this.setState({
        blockLifecycle: 'active'
      });
    }
  }

  didFinishAnimating(element) {
    if (this.animating) {
      this.animating = false;

      let currentAsset = this.state.nextAsset;
      let nextAsset;
      
      if (currentAsset === this.state.assetCount) {
        nextAsset = 1;
      } else {
        nextAsset = this.state.nextAsset + 1;
      }

      this.setState({
        blockLifecycle: 'idle',
        currentAsset: currentAsset,
        nextAsset: nextAsset
      });
    }
  }

  render() {
    return (
      <div style={[
        this.style.base,
        this.style[`${this.state.format}${this.state.seed}`]
      ]}>
        <div className="initial" style={[
          this.style.child, 
          this.style[this.state.currentAsset],
          this.style[`${this.state.blockLifecycle}InitialChild`]
        ]}></div>
        <div className="offset" style={[
          this.style.child, 
          this.style[this.state.nextAsset],
          this.style[`${this.state.blockLifecycle}OffsetChild`]
        ]}></div>
      </div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Block);
