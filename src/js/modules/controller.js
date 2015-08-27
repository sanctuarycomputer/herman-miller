import Assetable from 'herman-miller/modules/assetable';
import Interactable from 'herman-miller/modules/interactable';

class Controller extends Interactable{
  constructor(props) {
    super(...arguments)
    this.state['status'] = 'unmuted'
  }

  style = {
    base: {
      position: 'absolute',
      bottom: '-58px',
      right: '40px',
      height: '40px',
      width: '40px',
      backgroundSize: 'contain',
      cursor: 'pointer'
    },

    unmuted: {
      backgroundImage: `url(${this.state.assets[0]})`
    },
    muted: {
      backgroundImage: `url(${this.state.assets[1]})`
    }

  }

  onClick() {
    if(Howler._muted === false){
      Howler.mute();
      this.setState({
        status: 'muted'
      });
    }
    else{
      Howler.unmute();
      this.setState({
        status: 'unmuted'
      });
    }
  }

  render() {
    return (
        <div style={[
          this.style.base,
          this.style[this.state.status]
        ]}></div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Controller);
