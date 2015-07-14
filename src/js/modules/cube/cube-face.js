class CubeFace extends React.Component {
  style = {
    base: {
      width: "60vmin",
      height: "60vmin",
      position: "absolute",
      backgroundColor: "rgba(123,123,123,1)",
      boxSizing: "border-box",
      border: "2px solid black"
    },
    front:  { transform: "translateZ( 30vmin )" },
    back:   { transform: "translateZ( -30vmin )" },
    right:  { transform: "translateZ( -30vmin ) rotateY(  90deg )", transformOrigin: "right"  },
    left:   { transform: "translateZ( -30vmin ) rotateY( -90deg )", transformOrigin: "left"   },
    top:    { transform: "translateZ( -30vmin ) rotateX(  90deg )", transformOrigin: "top"    },
    bottom: { transform: "translateZ( -30vmin ) rotateX( -90deg )", transformOrigin: "bottom" },

    flat: {
      base:   { transform: "translateZ( -29.5vmin )", transition: "transform 2s ease, opacity 0.5s ease-out" },
      front:  { transform: "translateZ( 200vmin )", opacity: 0 },
      back:   { transform: "translateZ( -29.5vmin )" },
      right:  { transform: "translateZ( -30vmin ) rotateY(  182deg )" },
      left:   { transform: "translateZ( -30vmin ) rotateY( -182deg )" },
      top:    { transform: "translateZ( -30vmin ) rotateX(  182deg )" },
      bottom: { transform: "translateZ( -30vmin ) rotateX( -182deg )" }
    }
  }

  combinedStyles() {
    let styles = [this.style.base, this.style[this.props.face]];
    
    if (this.props.isFlat) {
      styles.push(this.style.flat.base);
      styles.push(this.style.flat[this.props.face]);
    }

    return styles;
  }

  render() {
    return (
      <div style={this.combinedStyles()}>
        {this.props.children || this.props.face}
      </div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(CubeFace);
