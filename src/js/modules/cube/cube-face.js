class CubeFace extends React.Component {
  style = {
    base: {
      width: "80vmin",
      height: "80vmin",
      position: "absolute",
      backgroundSize: 'cover',
      boxSizing: "border-box"
    },
    front:  { transform: "translateZ( 40vmin )" },
    back:   { transform: "translateZ( -40vmin )" },
    right:  { transform: "translateZ( -40vmin ) rotateY(  90deg )", transformOrigin: "right"  },
    left:   { transform: "translateZ( -40vmin ) rotateY( -90deg )", transformOrigin: "left"   },
    top:    { transform: "translateZ( -40vmin ) rotateX(  90deg )", transformOrigin: "top"    },
    bottom: { transform: "translateZ( -40vmin ) rotateX( -90deg )", transformOrigin: "bottom", backgroundImage: `url(${this.props.asset})` },

    flat: {
      base:   { transform: "translateZ( -39.5vmin )", transition: "transform 2s ease, opacity 0.5s ease-out" },
      front:  { transform: "translateZ( 200vmin )", opacity: 0 }, // exploding top
      right:  { transform: "translateZ( -40vmin ) rotateY(  183deg )" },
      left:   { transform: "translateZ( -40vmin ) rotateY( -183deg )" },
      top:    { transform: "translateZ( -40vmin ) rotateX(  183deg )" },
      bottom: { transform: "translateZ( -40vmin ) rotateX( -183deg )" }
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
