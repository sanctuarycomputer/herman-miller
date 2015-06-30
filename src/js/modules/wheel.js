import Interactable from 'herman-miller/modules/interactable';

class Wheel extends Interactable {
  constructor(props) {
    super(...arguments);
    this.state['seed'] = props.seed;
  }

  style = {
    base: {
      width: '200px',
      height: '200px',
      borderRadius: '100px',
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
