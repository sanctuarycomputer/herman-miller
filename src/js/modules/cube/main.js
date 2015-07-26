import Artboard from 'herman-miller/modules/artboard';
import CubeFace from 'herman-miller/modules/cube/cube-face';
import CubeFaceOpenable from 'herman-miller/modules/cube/cube-face-openable';
import Assetable from 'herman-miller/modules/assetable';

class Cube extends Assetable {

  componentDidMount() {
    let el = React.findDOMNode(this);

    const Global = window.eamesInteractive;
    
    const flattenBox = () => {
      this.setState({isFlat: true});
      Global.boxWillOpen();
      el.onclick = null; // kill listener
    }

    el.onclick = (event) => {
      event.preventDefault();
      if (this.state.visibleFace !== "front") {
        this.setState({visibleFace: "front"});
        setTimeout(flattenBox, 3200);
      } else {
        flattenBox();
      }
    };
  }

  style = {
    cube: {
      top: "50%",
      left: "50%",
      marginLeft: "-30vmin",
      marginTop: "-30vmin",
      width: "60vmin",
      height: "60vmin",
      position: "absolute",
      transformStyle: "preserve-3d",
      zIndex: '1',
      transform: "translateZ( -120vmin ) rotateX( 74deg )", // initial perspective
      transition: "transform 3.5s",
    },
    visibleFace: {
      front:  { transform: "translateZ( -30vmin )" },
      back:   { transform: "translateZ( -30vmin ) rotateX( -180deg )" },
      right:  { transform: "translateZ( -30vmin ) rotateY(  -90deg )" },
      left:   { transform: "translateZ( -30vmin ) rotateY(   90deg )" },
      top:    { transform: "translateZ( -30vmin ) rotateX(  -90deg )" },
      bottom: { transform: "translateZ( -30vmin ) rotateX(   90deg )" }
    },
    flattened : { // The viewport perspective once the box is open:
      transform: "translateZ(42vmin) translateY(0vmin) rotateX(0deg)"
    }
  }

  combinedStyles() {
    let styles = [this.style.cube, this.style.visibleFace[this.state.visibleFace]];
    if (this.state.isFlat) styles.push(this.style.flattened);
    return styles;
  }

  render() {
    return (
      <div style={this.combinedStyles()}>
        <CubeFaceOpenable face="front" 
                          assetLeft={this.state.assets[1]} 
                          assetRight={this.state.assets[2]} 
                          isFlat={this.state.isFlat} 
                          isOpen={this.state.isFlat} />

        <CubeFace face="back"   isFlat={this.state.isFlat}>
          <Artboard />
        </CubeFace>

        <CubeFace face="right"  isFlat={this.state.isFlat} />
        <CubeFace face="left"   isFlat={this.state.isFlat} />
        <CubeFace face="top"    isFlat={this.state.isFlat} />
        <CubeFace face="bottom" isFlat={this.state.isFlat} asset={this.state.assets[0]} />
      </div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Cube);
