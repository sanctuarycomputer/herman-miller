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
    this.state.styles = {};

    let style = this.style.base;
    let [w, h] = this.props.widthHeightVmins;
    
    style.width = `${w}vmin`;
    style.height = `${h}vmin`;
    style.marginRight = `${w/10}vmin`;
    style.marginBottom = `${h/10}vmin`;

  }

  componentDidMount() {
    super.componentDidMount();
    let el = React.findDOMNode(this);
    
    this.setState({
      styles: {
        position: 'absolute',
        left: `${el.offsetLeft}px`,
        top: `${el.offsetTop}px`
      }
    });
  }

  style = {
    base: {
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'top',
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
      let el = findDOMNode(this).querySelector('.initial');

      el.addEventListener("webkitTransitionEnd", this.didFinishAnimating.bind(this, el), true);
      el.addEventListener("transitionend", this.didFinishAnimating.bind(this, el), true);
      el.addEventListener("otransitionend", this.didFinishAnimating.bind(this, el), true);

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
      <div style={[this.style.base, this.state.styles]}>
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
