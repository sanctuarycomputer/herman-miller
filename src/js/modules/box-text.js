import Assetable from 'herman-miller/modules/assetable';

class BoxText extends Assetable {
  constructor(props) {
    super(...arguments);
    this.state['boxTextState'] = 'hidden';
    
    const Global = window.eamesInteractive;
    Global.onReady(() => {
      if (!this.boxTextShown) {
        this.boxTextShown = true;
        this.timer = window.setTimeout(this.showText.bind(this), 3200);
      }
    });
    
    Global.onBoxClick(() => {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      this.setState({
        boxTextState: 'hidden'
      })
    });
  }
  
  timer = null;
  boxTextShown = false;

  showText() {
    this.setState({
      boxTextState: 'visible'
    });
  }

  style = {
    base: {
      width: '183px',
      height: '26px',
      position: 'absolute',
      zIndex: 2,
      top: '260px',
      left: '50%',
      pointerEvents: 'none',
      backgroundImage: `url(${this.state.assets[0]})`,
      transition: 'all 500ms'
    },
    hidden: {
      transform: 'translate(-50%, -10px)',
      opacity: 0
    },
    visible: {
      transform: 'translate(-50%, 0px)',
      opacity: 1
    } 
  }

  render() {
    return (
      <div style={[
        this.style.base,
        this.style[this.state.boxTextState]
      ]}></div>   
    );
  }
}

export default new Radium(BoxText);
