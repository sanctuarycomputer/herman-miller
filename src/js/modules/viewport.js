import Assetable from 'herman-miller/modules/assetable';
import Cube from 'herman-miller/modules/cube/main';

class Viewport extends Assetable {
  constructor() {
    super(...arguments);
    this.state['boxLifecycle'] = 'idle';
    const Global = window.eamesInteractive;
    Global.onBoxOpen(() => {
      this.setState({
        boxLifecycle: 'active'
      })
    });
  }
  style = {
    base: {
      width: "100%",
      height: "100%",
      perspective: "1750px",
      position: "relative",
      backgroundColor: 'rgb(191, 182, 195)',
    },
    background: {
      backgroundImage: `url(${this.state.assets[0]})`,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      opacity: 0,
      transition: "opacity 2.5s",
      zIndex: '-1',
      pointerEvents: 'none'
    },
    active: {
      opacity: 1
    }
  }

  render() {
    return (
      <div style={[this.style.base]}>
        <Cube seed={1} format={'box'} assetCount={3} assetFormat={'jpg'} />
        <div style={ [this.style.background, this.style[this.state.boxLifecycle]]  } />
      </div>
    );
  }
}

export default new Radium(Viewport);
