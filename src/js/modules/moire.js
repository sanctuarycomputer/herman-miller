import Wheel from 'herman-miller/modules/wheel';

class Moire extends Wheel {
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
      <div style={[this.wheelStyle.base, this.state.styles]}>
        <div style={ [this.wheelStyle.inner, this.wheelStyle[this.state.wheelLifecycle]] }></div> 
        <div style={ [this.style.base] }></div>
      </div>
    );
  }
}

export default new Radium(Moire);
