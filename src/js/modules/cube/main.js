import CubeFace from 'herman-miller/modules/cube/cube-face';
import CubeFaceOpenable from 'herman-miller/modules/cube/cube-face-openable';
import Assetable from 'herman-miller/modules/assetable';

class Cube extends Assetable {
  constructor() {
    super(...arguments);
    this.state['cubeVisibility'] = 'hidden';

    const Global = window.eamesInteractive;
    Global.onReady(() => {
      this.state['cubeVisibility'] = 'visible';
    });
  }

  handleClick = () => {
    if (this.state.visibleFace !== "front") {
      this.setState({ visibleFace: "front" });
      setTimeout(this.flattenBox, 1500);
    }
  }
  
  flattenBox = () => {
    this.setState({ isFlat: true });
    const Global = window.eamesInteractive;
    Global.boxWillOpen();
  }

  style = {
    cube: {
      cursor: 'pointer',
      opacity: 0,
      width: '588px',
      height: '588px',
      margin: "-18.5px 196px 0px 196px",
      position: "absolute",
      transformStyle: "preserve-3d",
      zIndex: '1',
      transform: "translateZ( -120vmin ) translateY( 0px ) rotateX( 90deg )", // initial perspective
      transition: "transform 1.6s, opacity 0.8s 0.8s",
    },
    visible: {
      opacity: 1 
    },
    visibleFace: {
      front:  { 
        transform: "translateZ( -41vmin ) translateY( 0px )" 
      },
      bottom: { 
        transform: "translateZ( -30vmin ) rotateX( 90deg )" 
      }
    },
    flattened : {
      pointerEvents: 'none',
      transform: "translateZ(42vmin) translateY( 0px ) rotateX(0deg)"
    }
  }

  combinedStyles() {
    let styles = [this.style.cube, this.style[this.state.cubeVisibility], this.style.visibleFace[this.state.visibleFace]];
    if (this.state.isFlat) styles.push(this.style.flattened);
    return styles;
  }

  render() {
    return (
      <div onClick={this.handleClick} style={this.combinedStyles()}>
        <CubeFaceOpenable face="front" 
                          assetLeft={this.state.assets[1]} 
                          assetRight={this.state.assets[2]} 
                          assetLeftBack={this.state.assets[3]} 
                          assetRightBack={this.state.assets[4]} 
                          isFlat={this.state.isFlat} 
                          isOpen={this.state.isFlat} />

        <CubeFace face="bottom" isFlat={this.state.isFlat} asset={this.state.assets[0]} />
      </div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Cube);
