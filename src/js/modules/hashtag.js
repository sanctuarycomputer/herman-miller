import Assetable from 'herman-miller/modules/assetable';

class Hashtag extends Assetable {
  constructor() {
    super(...arguments);
    this.state['hashtagVisibility'] = 'visible';

    const Global = window.eamesInteractive;
    Global.willScreenshot(() => {
      this.setState({
        hashtagVisibility: 'visible' 
      });
    });

    Global.didScreenshot(() => {
      this.setState({
        hashtagVisibility: 'hidden' 
      });
    });
  }

  style = {
    base: {
      bottom: '-55px', 
      left: '30px',
      height: '20px',
      width: '600px',
      position: 'absolute',
      color: 'white',
      fontFamily: 'ff-meta-web-pro, Helvetica, Arial, sans-serif',
      fontWeight: 100,
      lineHeight: '18px',
      letterSpacing: '1px',
      fontSize: '14px',
      backgroundImage: `url(${this.state.assets[0]})`
    },
    para: {
      marginBottom: '-7px',
      marginLeft: '18px'
    },

    hidden: {
      visibility: 'hidden'
    },

    visible: {
      visibility: 'visible' 
    }
  }

  render() {
    return (
      <div style={[
        this.style.base,
        this.style[this.state.hashtagVisibility]
      ]}>
      </div>    
    )
  }
}

export default new Radium(Hashtag);
