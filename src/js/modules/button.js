import Assetable from 'herman-miller/modules/assetable';
import Interactable from 'herman-miller/modules/interactable';

class Button extends Interactable {
  constructor(props) {
    super(...arguments)
  }

  style = {
    base: {
      position: 'absolute',
      bottom: '-58px',
      right: '40px',
      height: '40px',
      width: '40px',
      backgroundSize: 'contain',
      backgroundColor: 'pink',
      cursor: 'pointer'
    }
  }

  onClick() {
    const Global = window.eamesInteractive;
    Global.screenshot();
  }

  render() {
    return (
      <div style={[
        this.style.base
      ]}></div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Button);
