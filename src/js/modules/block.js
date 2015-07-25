import Interactable from 'herman-miller/modules/interactable';

class Block extends Interactable {
  constructor(props) {
    super(...arguments);
    this.state['currentAsset'] = 1;
  }

  style = {
    base: {
      width: '20vmin',
      height: '20vmin',
      position: 'absolute',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      transform: 'translateZ(0)' // enable hardware acceleration
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
    }
  }

  render() {
    return (
      <div style={[this.style.base, this.style[this.state.currentAsset]]}></div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Block);
