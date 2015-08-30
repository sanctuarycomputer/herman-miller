import Assetable from 'herman-miller/modules/assetable';
import Interactable from 'herman-miller/modules/interactable';

class Button extends Interactable {
  constructor(props) {
    super(...arguments);
  }

  style = {
    base: {
      position: 'absolute',
      bottom: '-58px',
      height: '30px',
      width: '30px',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      cursor: 'pointer',
      backgroundImage: `url(${this.state.assets[0]})`
    },

    screenshot: {
      right: '20px'
    },

    audio: {
      right: '80px'
    },
    muted: {
      backgroundImage: `url(${this.state.assets[1]})`
    },

    info: {
      right: '140px'
    },

    shareFacebook: {
      position: 'relative',
      bottom: 'inherit',
      display: 'inline-block',
      marginLeft: '10px',
      width: '38px',
      height: '38px',
      border: '2px solid white'
    },
    
    shareTwitter: {
      position: 'relative',
      bottom: 'inherit',
      display: 'inline-block',
      marginLeft: '10px',
      width: '38px',
      height: '38px',
      border: '2px solid white'
    },

    overlayCross: {
      right: '15px',
      top: '15px',
      height: '20px',
      width: '20px'
    }
  }

  onClick() {
    const Global = window.eamesInteractive;
    switch (this.props.variation) {
      case 'screenshot':
        Global.screenshot();
        break;
      case 'info':
        Global.toggleInfo();
        break;
      case 'overlayCross':
        Global.toggleInfo();
        break;
      case 'audio':
        if(Howler._muted === false){
          Howler.mute();
          this.setState({
            status: 'muted'
          });
        }
        else{
          Howler.unmute();
          this.setState({
            status: null
          });
        }
        break;
      case 'shareFacebook':
        this.fbShare(window.location.href, 'Share', 'Facebook Share Popup', 520, 350);
        break;
      case 'shareTwitter':
        this.twitterShare(window.location.href, 'Share', 520, 350);
        break;
    }
  }

  fbShare(url, title, descr, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
  }
  
  twitterShare(url, tweet, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('https://twitter.com/home?status=' + tweet + ' ' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
  }

  render() {
    return (
      <div style={[
        this.style.base,
        this.style[this.props.variation],
        this.style[this.state.status]
      ]}></div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Button);
