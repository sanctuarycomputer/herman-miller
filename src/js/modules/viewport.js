import Assetable from 'herman-miller/modules/assetable';
import Cube from 'herman-miller/modules/cube/main';

class Viewport extends Assetable {
  style = {
    base: {
      width: "100%",
      height: "100%",
      perspective: "1750px",
      position: "relative"
    },
    loading: {

    },
    ready: {
      opacity: 1,
      backgroundImage: `url(${this.state.assets[0]})` 
    }
  }

  render() {
    return (
      <div style={[this.style.base, this.style[this.state.lifecycle]]}>
        <Cube />
      </div>
    );
  }
}

export default new Radium(Viewport);
