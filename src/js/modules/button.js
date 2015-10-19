import Assetable from 'herman-miller/modules/assetable';
import Interactable from 'herman-miller/modules/interactable';

class Button extends Interactable {
  constructor(props) {
    super(...arguments);
          
    const Global = window.eamesInteractive;
    Global.willScreenshot(() => {
      this.setState({
        buttonVisibility: 'hidden' 
      });
    });

    Global.didScreenshot(() => {
      this.setState({
        buttonVisibility: 'visible' 
      });
    });
    
    if (this.props.variation === 'info') {
      Global.onToggleInfo(() => {
        if (!Global.infoScreenActive) {
          this.setState({
            status: 'infoActive'
          });
        } else {
          this.setState({
            status: null
          });
        }
      });
    }
  }

  bounceElement() {
    let el = React.findDOMNode(this);
    dynamics.animate(el, { scale: 1.25 }, { type: dynamics.bounce });
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
      right: '140px',
      transition: "opacity 350ms",
      ':hover': {
        backgroundImage: `url(${this.state.assets[1]})`,
        opacity: 0.6
      }
    },

    audio: {
      right: '20px',
      transition: "opacity 350ms",
      ':hover': {
        backgroundImage: `url(${this.state.assets[1]})`,
        opacity: 0.6
      }
    },

    muted: {
      backgroundImage: `url(${this.state.assets[1]})`
    },

    info: {
      right: '80px',
      transition: "opacity 350ms",
      ':hover': {
        backgroundImage: `url(${this.state.assets[1]})`,
        opacity: 0.6
      }
    },

    infoActive: {
      backgroundImage: `url(${this.state.assets[1]})`
    },

    shareFacebook: {
      position: 'relative',
      bottom: 'inherit',
      display: 'inline-block',
      marginRight: '10px',
      width: '42px',
      height: '42px',
      border: '2px solid white'
    },
    
    shareTwitter: {
      position: 'relative',
      bottom: 'inherit',
      display: 'inline-block',
      width: '42px',
      height: '42px',
      border: '2px solid white'
    },

    overlayCross: {
      right: '15px',
      top: '15px',
      height: '20px',
      width: '20px'
    },

    hidden: {
      visibility: 'hidden'
    },

    visible: {
      visibility: 'visible' 
    }
  }

  toggleOverlay() {
  
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
        let post = window.eamesInteractive.translations.facebook;
        this.fbShare(window.location.href, 'Share', post, 520, 350);
        break;
      case 'shareTwitter':
        let tweet = window.eamesInteractive.translations.twitter;
        this.twitterShare(window.location.href, tweet, 520, 350);
        break;
    }
  }

  fbShare(url, title, descr, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + 'hello'+ '&p[url]=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
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
        this.style[this.state.status],
        this.style[this.state.buttonVisibility]
      ]} onMouseOver={this.bounceElement.bind(this)}></div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Button);
