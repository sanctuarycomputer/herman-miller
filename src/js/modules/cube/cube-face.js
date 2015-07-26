class CubeFace extends React.Component {
  style = {
    base: {
      width: "60vmin",
      height: "60vmin",
      position: "absolute",
      backgroundSize: 'cover',
      boxSizing: "border-box"
    },
    front:  { transform: "translateZ( 30vmin )" },
    back:   { transform: "translateZ( -30vmin )" },
    right:  { transform: "translateZ( -30vmin ) rotateY(  90deg )", transformOrigin: "right"  },
    left:   { transform: "translateZ( -30vmin ) rotateY( -90deg )", transformOrigin: "left"   },
    top:    { transform: "translateZ( -30vmin ) rotateX(  90deg )", transformOrigin: "top"    },
    bottom: { transform: "translateZ( -30vmin ) rotateX( -90deg )", transformOrigin: "bottom", backgroundImage: `url(${this.props.asset})` },

    flat: {
      base:   { transform: "translateZ( -29.5vmin )", transition: "transform 2s ease, opacity 0.5s ease-out" },
      front:  { transform: "translateZ( 0vmin )" },
      back:   { transform: "translateZ( -29.5vmin )" },
      right:  { transform: "translateZ( -30vmin ) rotateY(  182deg )" },
      left:   { transform: "translateZ( -30vmin ) rotateY( -182deg )" },
      top:    { transform: "translateZ( -30vmin ) rotateX(  182deg )" },
      bottom: { transform: "translateZ( -30vmin ) rotateX( -182deg )", opacity: '0', transition: '0s' }
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
        {this.props.children}
      </div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(CubeFace);
