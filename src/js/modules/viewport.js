import Assetable from 'herman-miller/modules/assetable';
import Artboard from 'herman-miller/modules/artboard';
import Cube from 'herman-miller/modules/cube/main';

class Viewport extends Assetable {
  constructor() {
    super(...arguments);
    this.state['loadingState'] = 'loading';
    const Global = window.eamesInteractive;
    Global.onReady(() => {
      this.state['loadingState'] = 'finishedLoading';
    });
  }
  style = {
    base: {
      width: '980px',
      height: '551px',
      perspective: "1750px",
      position: "relative",
      backgroundColor: 'rgb(191, 182, 195)',
      overflow: 'hidden'
    },
    loader: {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${this.state.assets[0]})`,
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '50px',
      opacity: 1,
      pointerEvents: 'none',
      transition: "opacity 2.5s",
      position: 'absolute'
    },
    finishedLoading: {
      opacity: 0 
    }
  }

  render() {
    return (
      <div style={[this.style.base]}>
        <div style={[this.style.loader, this.style[this.state.loadingState]]}/>
        <Cube seed={1} format={'box'} assetCount={3} assetFormat={'jpg'} />
        <Artboard seed={1} format={'background'} assetFormat={'jpg'} />
      </div>
    );
  }
}

export default new Radium(Viewport);
