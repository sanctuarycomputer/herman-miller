class CubeFace extends React.Component {
  style = {
    base: {
      width: "588px",
      height: "588px",
      position: "absolute",
      backgroundSize: 'cover',
      boxSizing: "border-box"
    },
    front:  { 
      transform: "translateZ( 294px )",
      backfaceVisibility: "hidden"
    },
    bottom: { 
      transform: "translateZ( -294px ) rotateX( -90deg )", 
      transformOrigin: "bottom", 
      backgroundImage: `url(${this.props.asset})` 
    },
    flat: {
      base:   { 
        transform: "translateZ( -29.5vmin )", 
        transition: "transform 2s ease, opacity 0.5s ease-out" 
      },
      front:  { 
        transform: "translateZ( 0vmin )",
        backfaceVisibility: "hidden"
      },
      bottom: { 
        transform: "translateZ( -30vmin ) rotateX( -182deg )", 
        opacity: '0', 
        transition: '0s' 
      }
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
      <div style={this.combinedStyles()} />
    );
  }
}

export default new Radium(CubeFace);
