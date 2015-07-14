import Interactable from 'herman-miller/modules/interactable';

class Block extends Interactable {
  constructor(props) {
    super(...arguments);
    this.state['seed'] = props.seed;
  }

  style = {
    base: {
      width: "20vmin",
      height: "20vmin",
      position: 'absolute',
      transform: 'translateZ(0)' // enable hardware acceleration
    },
    1: {
      backgroundColor: '#FFBB6C'
    },
    2: {
      backgroundColor: '#D4896A'
    },
    3: {
      backgroundColor: '#9F6C66'
    },
    4: {
      backgroundColor: '#503C53'
    }
  }

  render() {
    return (
      <div style={[this.style.base, this.style[this.state.seed]]}></div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Block);
