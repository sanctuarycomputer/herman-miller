import CubeFace from 'herman-miller/modules/cube/cube-face';

class CubeFaceOpenable extends CubeFace {
  constructor(props) {
    super(...arguments);
    this.state = {open: false};
    this.style.base.backgroundColor = "transparent";
    this.style.isOpen = () => {
      if (this.props.isOpen) return { "pointerEvents": "none" }
    }
  }

  extendedStyle = {
    width: "50%",
    height: "100%",
    border: "1px solid gray",
    backgroundColor: "black",
    color: "#aaa",
    position: "absolute",
    top: "0",
    bottom: "0",
    transition: "transform 2.5s",
  }

  leftStyles() {
    let style = {left: "0"}
    if (this.props.isOpen) {
      style.transform = "rotateY(-150deg)";
      style.transformOrigin = "left";
    }
    return style;
  }

  rightStyles() {
    let style = {right: "0"}
    if (this.props.isOpen) {
      style.transform = "rotateY(150deg)";
      style.transformOrigin = "right";
    }
    return style;
  }

  // XXX: Also, rendering? Seems weird to copy-paste the original code after inheriting:
  render() {
    return (
      <div style={this.combinedStyles().concat(this.style.isOpen())}>
        <div style={[this.extendedStyle, this.leftStyles()]}>{this.props.face} Left</div>
        <div style={[this.extendedStyle, this.rightStyles()]}>{this.props.face} Right</div>
      </div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(CubeFaceOpenable);
