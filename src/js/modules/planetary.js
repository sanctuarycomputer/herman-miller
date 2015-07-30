import Wheel from 'herman-miller/modules/wheel';

class Planetary extends Wheel {
  style = {
    satellite: {
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      width: '80px',
      height: '80px'
    },
    satellite1: {
      backgroundImage: `url(${this.state.assets[1]})`,
      bottom: '30px',
      left: '7px'
    },
    satellite2: {
      backgroundImage: `url(${this.state.assets[2]})`,
      bottom: '30px',
      right: '7px'
    },
    satellite3: {
      backgroundImage: `url(${this.state.assets[3]})`,
      left: '60px',
      top: '0px'
    }
  }

  render() {
    return (
      <div style={[this.wheelStyle.base, this.state.styles]}>
        <div style={ [this.wheelStyle.inner, this.wheelStyle[this.state.wheelLifecycle]] }>
          <div style={ [this.style.satellite, this.style.satellite1, this.wheelStyle[this.state.wheelLifecycle]] }></div>
          <div style={ [this.style.satellite, this.style.satellite2, this.wheelStyle[this.state.wheelLifecycle]] }></div>
          <div style={ [this.style.satellite, this.style.satellite3, this.wheelStyle[this.state.wheelLifecycle]] }></div>
        </div> 
      </div>
    );
  }
}

export default new Radium(Planetary);
