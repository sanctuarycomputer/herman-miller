import Wheel from 'herman-miller/modules/wheel';
import Handle from 'herman-miller/modules/handle';

class Planetary extends Wheel {
  style = {
    satellite: {
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      width: '40%',
      height: '40%'
    },
    satellite1: {
      backgroundImage: `url(${this.state.assets[1]})`,
      bottom: '15%',
      left: '5%'
    },
    satellite2: {
      backgroundImage: `url(${this.state.assets[2]})`,
      bottom: '15%',
      right: '5%'
    },
    satellite3: {
      backgroundImage: `url(${this.state.assets[3]})`,
      left: '30%',
      top: '0%'
    }
  }

  render() {
    return (
      <div style={[this.wheelStyle.base, this.wheelStyle[`wheel${this.state.wheelIndex}`]]}>
        <div style={ [this.wheelStyle.inner, this.wheelStyle[this.state.wheelLifecycle]] }>
          <div style={ [this.style.satellite, this.style.satellite1, this.wheelStyle[this.state.wheelLifecycle]] }></div>
          <div style={ [this.style.satellite, this.style.satellite2, this.wheelStyle[this.state.wheelLifecycle]] }></div>
          <div style={ [this.style.satellite, this.style.satellite3, this.wheelStyle[this.state.wheelLifecycle]] }></div>
        </div> 
        <Handle format={'handle'} assetFormat={'svg'} />
      </div>
    );
  }
}

export default new Radium(Planetary);
