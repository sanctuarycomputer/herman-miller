import Assetable from 'herman-miller/modules/assetable';

class Shimmer extends Assetable {
  constructor(props) {
    super(...arguments);
    this.state['shimmerState'] = 'idle';
    
    const Global = window.eamesInteractive;
    Global.onReady(() => {
      if (!this.shimmerStarted) {
        this.shimmerStarted = true;
        window.setTimeout(this.toggleShimmerState.bind(this), 2000);
        window.setTimeout(this.toggleShimmerState.bind(this), 3000);
      }
    });
  }

  shimmerStarted = false;

  toggleShimmerState() {
    this.setState({
      shimmerState: this.state.shimmerState === 'shimmer' ? 'idle' : 'shimmer'
    });
  }

  shimmerAnimation = Radium.keyframes({
    '0%': {
      backgroundPosition: "0px"
    },
    '100%': {
      backgroundPosition: "-1500px"
    }
  });

  shimmerCycle = `url(${this.state.assets[0]})`;

  style = {
    base: {
      width: '100px',
      height: '100px',
      position: 'absolute',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      zIndex: 2,
      top: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      pointerEvents: 'none'
    },
    idle: {
      opacity: 0
    },
    shimmer: {
      opacity: 1,
      animation: `${this.shimmerAnimation} 1s steps(15, end) infinite`,
      background: `${this.shimmerCycle} left center`
    } 
  }

  render() {
    return (
      <div style={[
        this.style.base,
        this.style[this.state.shimmerState]
      ]}></div>   
    );
  }
}

export default new Radium(Shimmer);
