import Wheel from 'herman-miller/modules/wheel';

class Optical extends Wheel {
  render() {
    return (
      <div style={[this.wheelStyle.base, this.wheelStyle[`wheel${this.state.wheelIndex}`]]}>
        <div style={ [this.wheelStyle.inner, this.wheelStyle[this.state.wheelLifecycle]] }>
        </div> 
      </div>
    );
  }
}

export default new Radium(Optical);
