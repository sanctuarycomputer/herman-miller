import Wheel from 'herman-miller/modules/wheel';
import Handle from 'herman-miller/modules/handle';

class Moire extends Wheel {
  constructor() {
    super(...arguments);
    this.wheelStyle.active.animationDuration = '6.25s';
  }
  style = {
    base: {
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      backgroundImage: `url(${this.state.assets[1]})`
    }
  }
  render() {
    return (
      <div style={[this.wheelStyle.base, this.wheelStyle[`wheel${this.state.wheelIndex}`]]}>
        <div style={ [this.wheelStyle.inner, this.wheelStyle[this.state.wheelLifecycle]] }></div> 
        <div style={ [this.style.base] }></div>
        <Handle format={'handle'} assetFormat={'png'} />
      </div>
    );
  }
}

export default new Radium(Moire);
