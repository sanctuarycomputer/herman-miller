import Assetable from 'herman-miller/modules/assetable';

class Spinner extends Assetable {
  constructor() {
    super(...arguments);
    this.state['loadingState'] = 'loading';
    const Global = window.eamesInteractive;
    Global.onReady(() => {
      this.state['loadingState'] = 'finishedLoading';
    });
  }

  style = {
    loader: {
      width: '100%',
      height: '100%',
      backgroundImage: `url(${this.state.assets[0]})`,
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '50px',
      opacity: 1,
      pointerEvents: 'none',
      transition: "opacity 0.8s",
      position: 'absolute'
    },
    finishedLoading: {
      opacity: 0 
    }
  }
  render() {
    return (
      <div style={[this.style.loader, this.style[this.state.loadingState]]}/>
    );
  }
}

export default new Radium(Spinner);
