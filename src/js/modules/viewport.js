import Assetable from 'herman-miller/modules/assetable';
import Spinner from 'herman-miller/modules/spinner';
import Artboard from 'herman-miller/modules/artboard';
import Cube from 'herman-miller/modules/cube/main';

class Viewport extends Assetable {
  constructor() {
    super(...arguments);
    this.state['viewportLifecycle'] = 'idle';
    
    const Global = window.eamesInteractive;
    Global.onBoxOpen(() => {
      this.setState({
        viewportLifecycle: 'active'
      })
    });
  }

  style = {
    base: {
      width: '980px',
      height: '551px',
      perspective: "1750px",
      position: "relative",
      backgroundColor: 'rgb(147, 144, 144)',
      overflow: 'hidden',
    },
    background: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundImage: `url(${this.state.assets[0]})`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      opacity: 0,
      transition: "opacity 5s",
      zIndex: '-1'
    },
    active: {
      opacity: 1 
    }
  }

  render() {
    return (
      <div style={[this.style.base]}>
        <Spinner seed={1} format={'spinner'} />
        <Cube seed={1} format={'box'} assetCount={5} assetFormat={'jpg'} />
        <Artboard />
        <div style={[this.style.background, this.style[this.state.viewportLifecycle]]} />
      </div>
    );
  }
}

export default new Radium(Viewport);
