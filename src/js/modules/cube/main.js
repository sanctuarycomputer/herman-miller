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
      setTimeout(this.flattenBox, 3200);
    }
  }
  
  flattenBox = () => {
    this.setState({ isFlat: true });
    const Global = window.eamesInteractive;
    Global.boxWillOpen();
  }

  style = {
    cube: {
      opacity: 0,
      top: "50%",
      left: "50%",
      marginLeft: "-30%",
      marginTop: "-30%",
      width: "60%",
      height: "60%",
      position: "absolute",
      transformStyle: "preserve-3d",
      zIndex: '1',
      transform: "translateZ( -120vmin ) translateY(130px) rotateX( 90deg )", // initial perspective
      transition: "transform 3.5s, opacity 2.5s 2.5s",
    },
    visible: {
      opacity: 1 
    },
    visibleFace: {
      front:  { 
        transform: "translateZ( -41vmin )" 
      },
      bottom: { 
        transform: "translateZ( -30vmin ) rotateX(   90deg )" 
      }
    },
    flattened : {
      pointerEvents: 'none',
      transform: "translateZ(42vmin) translateY(0vmin) rotateX(0deg)"
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
