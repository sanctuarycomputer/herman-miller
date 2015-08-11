import Handle from 'herman-miller/modules/handle';
import Interactable from 'herman-miller/modules/interactable';
import { random } from 'herman-miller/modules/utils';

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
    this.solid = true;
    
    // This could all be way nicer but we gotta ship this thing on monday
    switch(this.state.format) {
      case 'horiz':
        this.x = 500;
        this.y = 376;
        this.width = 200;
        this.height = 100;
        break;
      case 'vert':
        this.x = 500;
        this.y = 176;
        this.width = 100;
        this.height = 200;
        break;
      default:
        this.width = 100;
        this.height = 100;
        switch(this.state.seed) {
          case 1:
            this.x = 600;
            this.y = 276;
            break;
          case 2:
            this.x = 600;
            this.y = 176;
            break;
          case 3:
            this.x = 600;
            this.y = 76;
            break;
          case 4:
            this.x = 400;
            this.y = 376;
            break;
          case 5:
            this.x = 300;
            this.y = 376;
            break;
          case 6:
            this.x = 400;
            this.y = 276;
            break;
        }
    }
    //OK, now that's over...
    const Global = window.eamesInteractive;
    Global.setRegistryState(this.state.key, {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      solid: true
    });
  }

  style = {
    square1: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(600px, 276px, 0px)'
    },
    square2: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(600px, 176px, 0px)'
    },
    square3: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(600px, 76px, 0px)'
    },
    square4: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(400px, 376px, 0px)'
    },
    square5: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(300px, 376px, 0px)'
    },
    square6: {
      width: "100px",
      height: "100px",
      transform: 'translate3d(400px, 276px, 0px)'
    },
    horiz1: {
      width: "200px",
      height: "100px",
      transform: 'translate3d(500px, 376px, 0px)'
    },
    vert1: {
      width: "100px",
      height: "200px",
      transform: 'translate3d(500px, 176px, 0px)'
    },
    base: {
      position: 'absolute',
      overflow: 'hidden',
      cursor: 'pointer'
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
      transition: '0.5s all'
    },
    idleOffsetChild: {
      transform: 'translateX(100%)',
      opacity: 0
    },
    activeOffsetChild: {
      transform: 'translateX(0%)',
      transition: '0.5s all',
      opacity: 1
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

      const Sound = window.eamesInteractive.Sound;
      let index = Math.round(random(1, 10));
      Sound.single[index].play();

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
        <Handle format={'handle'} assetFormat={'png'} />
      </div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Block);
