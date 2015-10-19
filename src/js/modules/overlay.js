import Button from 'herman-miller/modules/button';
import Image from 'herman-miller/modules/image';

class Overlay extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      overlayState: 'overlayInactive',
      shareLink: window.location.href
    }

    const Global = window.eamesInteractive;
    Global.onToggleInfo(() => {
      let newState = this.state.overlayState === 'overlayActive' ? 'overlayInactive' : 'overlayActive';
      
      this.setState({
        overlayState: newState 
      });
      
      Global.infoScreenActive = newState === 'overlayActive';
    });
    
    Global.willScreenshot(() => {
      this.setState({
        overlayVisibility: 'hidden' 
      });
    });

    Global.didScreenshot(() => {
      this.setState({
        overlayVisibility: 'visible' 
      });
    });

    this.state.translations = Global.translations;
  }

  style = {
    base: {
      width: '900px',
      height: '471px',
      left: '40px',
      top: '40px',
      opacity: 0,
      pointerEvents: 'none',
      position: "absolute",
      backgroundColor: 'rgba(147, 144, 144, 0.8)',
      transition: '1s opacity'
    },
    overlayActive: {
      zIndex: 10,
      pointerEvents: 'auto',
      opacity: 1
    },
    copy: {
      padding: '0px 100px 0px 100px',
      color: 'white',
      fontFamily: 'ff-meta-web-pro, Helvetica, Arial, sans-serif',
      fontWeight: 100,
      lineHeight: '26px',
      letterSpacing: '1px',
      fontSize: '16px',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    shareInput: {
      padding: '10px',
      backgroundColor: 'transparent',
      outline: 'none',
      border: '2px solid white',
      color: 'white',
      fontFamily: 'ff-meta-web-pro, Helvetica, Arial, sans-serif',
      fontWeight: 100,
      fontSize: '15px',
      float: 'left'
    },
    credits: {
      color: 'black',
      fontFamily: 'ff-meta-web-pro, Helvetica, Arial, sans-serif',
      fontWeight: 100,
      lineHeight: '18px',
      letterSpacing: '1px',
      fontSize: '14px'
    },

    link: {
      textDecoration: 'none',
      color: 'black',
      fontWeight: 500
    },
    
    hidden: {
      visibility: 'hidden'
    },

    visible: {
      visibility: 'visible' 
    },

    inlineBlock: {
      margin: '0px',
      display: 'inline-block'
    },

    bumpHack: {
      transform: 'translateY(-3px)' 
    },

    floatLeft: {
      float: 'left' 
    },

    marginTop: {
      marginTop: '15px' 
    }
  }

  render() {
    return (
      <div style={[
        this.style.base,
        this.style[this.state.overlayState],
        this.style[this.state.overlayVisibility]
      ]}>
        <Button seed={6} format={'button'} assetFormat={'svg'} variation={'overlayCross'} />
        <div style={this.style.copy}>
          <p style={this.style.marginTop}>{this.state.translations.lineOne}</p>

          <p style={this.style.marginTop}>{this.state.translations.lineTwo}</p>

          <p style={[this.style.inlineBlock, this.style.floatLeft]}>{this.state.translations.lineThreeA}</p>
          <Image seed={1} format={'button'} assetFormat={'svg'} />
          <p style={[this.style.inlineBlock, this.style.bumpHack]}>{this.state.translations.lineThreeB}</p>
          
          <p>{this.state.translations.lineFour}</p>

          <div>
            <Button seed={5} format={'button'} assetFormat={'svg'} variation={'shareFacebook'} />
            <Button seed={4} format={'button'} assetFormat={'svg'} variation={'shareTwitter'} />
          </div>

          <div style={this.style.credits}>
            <p style={this.style.marginTop}>{this.state.translations.creditLineA}<a style={this.style.link} href="http://labour-ny.com/" target="_blank"> Labour </a>{this.state.translations.creditLineB}</p>
          </div>

        </div>
      </div>
    );
  }
}

export default new Radium(Overlay);
