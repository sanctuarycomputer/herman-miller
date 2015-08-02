import Wheel from 'herman-miller/modules/wheel';
import Handle from 'herman-miller/modules/handle';

class Optical extends Wheel {
  constructor() {
    super(...arguments);
    this.wheelStyle.active.animationDuration = '12.75s';
  }
  render() {
    return (
      <div style={[this.wheelStyle.base, this.wheelStyle[`wheel${this.state.wheelIndex}`]]}>
        <div style={ [this.wheelStyle.inner, this.wheelStyle[this.state.wheelLifecycle]] }>
        </div> 
        <Handle format={'handle'} assetFormat={'png'} />
      </div>
    );
  }
}

export default new Radium(Optical);
