import Cube from 'herman-miller/modules/cube/main';

class Viewport extends React.Component {
  style = {
    base: {
      width: "100%",
      height: "100%",
      backgroundColor: "wheat",
      perspective: "1750px",
      position: "relative"
    }
  }

  render() {
    return (
      <div style={[this.style.base]}>
        <Cube />
      </div>
    );
  }
}

export default new Radium(Viewport);
