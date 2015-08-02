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
    color: "#aaa",
    position: "absolute",
    top: "0",
    bottom: "0",
    transition: "transform 4s, opacity 2.5s ease-in-out 1.5s",
    backgroundSize: 'cover'
  }

  leftStyles(isBackface) {
    let style = {
      left: "0",
    }

    if (this.props.isOpen) {
      style.transform = "rotateY(-150deg)";
      style.transformOrigin = "left";
      style.opacity = 0;
    }

    if (isBackface) {
      style.backfaceVisibility = "visible";
      style.backgroundImage = `url(${this.props.assetLeftBack})`;
    } else {
      style.backfaceVisibility = "hidden";
      style.zIndex = 10;
      style.backgroundImage = `url(${this.props.assetLeft})`;
    }
    return style;
  }

  rightStyles(isBackface) {
    let style = {
      right: "0"
    }

    if (this.props.isOpen) {
      style.transform = "rotateY(150deg)";
      style.transformOrigin = "right";
      style.opacity = 0;
    }
    
    if (isBackface) {
      style.backfaceVisibility = "visible";
      style.backgroundImage = `url(${this.props.assetRightBack})`;
    } else {
      style.backfaceVisibility = "hidden";
      style.zIndex = 10;
      style.backgroundImage = `url(${this.props.assetRight})`;
    }
    return style;
  }

  // XXX: Also, rendering? Seems weird to copy-paste the original code after inheriting:
  render() {
    return (
      <div style={this.combinedStyles().concat(this.style.isOpen())}>
        <div style={[this.extendedStyle, this.leftStyles()]}></div>
        <div style={[this.extendedStyle, this.leftStyles(true)]}></div>
        <div style={[this.extendedStyle, this.rightStyles()]}></div>
        <div style={[this.extendedStyle, this.rightStyles(true)]}></div>
      </div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(CubeFaceOpenable);
