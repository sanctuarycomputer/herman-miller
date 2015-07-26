import Interactable from 'herman-miller/modules/interactable';

class Wheel extends Interactable {
  constructor(props) {
    super(...arguments);
  }

  style = {
    base: {
      width: '20vmin',
      height: '20vmin',
      borderRadius: '100%',
      position: 'absolute'
    },
    1: {
      backgroundColor: '#B988CC'
    },
    2: {
      backgroundColor: '#FFAFAA'
    }
  }

  render() {
    return (
      <div style={[this.style.base, this.style[this.state.seed]]}></div>
    );
  }
}

export default new Radium(Wheel);
