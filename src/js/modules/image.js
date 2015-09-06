import Assetable from 'herman-miller/modules/assetable';

class Image extends Assetable {

  style = {
    base: {
      width: '26px',
      height: '26px',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${this.state.assets[0]})`,
      zIndex: 2,
      transform: 'translateX(-50%)',
      pointerEvents: 'none',
      marginLeft: '22px',
      display: 'inline-block',
      float: 'left'
    }
  }

  render() {
    return (
      <div style={[
        this.style.base
      ]}></div>   
    );
  }
}

export default new Radium(Image);
