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
  }

  style = {
    square: {
      width: "20vmin",
      height: "20vmin",
    },
    horiz: {
      width: "40vmin",
      height: "20vmin",
    },
    vert: {
      width: "20vmin",
      height: "40vmin",
    },
    base: {
      position: 'absolute',
      overflow: 'hidden',
      transform: 'translateZ(0)' // enable hardware acceleration
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
        this.style[this.state.format]
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
