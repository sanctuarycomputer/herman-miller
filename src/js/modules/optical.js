import Wheel from 'herman-miller/modules/wheel';

class Optical extends Wheel {
  render() {
    return (
      <div style={[this.wheelStyle.base]}>
        <div style={ [this.wheelStyle.inner, this.wheelStyle[this.state.lifecycle]] }>
        </div> 
      </div>
    );
  }
}

export default new Radium(Optical);
