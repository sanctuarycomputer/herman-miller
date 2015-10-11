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
      })
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
      padding: '40px 100px 0px 100px',
      color: 'white',
      fontFamily: 'ff-meta-web-pro, Helvetica, Arial, sans-serif',
      fontWeight: 100,
      lineHeight: '26px',
      letterSpacing: '1px',
      fontSize: '16px'
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
          <p style={this.style.marginTop}>Ready to compose and play? Click on any object to introduce something new.</p>

          <p style={[this.style.inlineBlock, this.style.floatLeft]}>Jazz is delightful, but not all the time. Toggle the </p><Image seed={1} format={'button'} assetFormat={'svg'} /><p style={[this.style.inlineBlock, this.style.bumpHack]}> to turn it on or off.</p>

          <p style={this.style.marginTop}>To play with scale, click and drag the upper left corner of any object.</p>
          
          <p style={[this.style.inlineBlock, this.style.floatLeft]}>Like what you see? Select the </p><Image seed={2} format={'button'} assetFormat={'svg'} /><p style={[this.style.inlineBlock, this.style.bumpHack]}> to take a snapshot.</p>

          <p style={this.style.marginTop}>Use #EamesPlay when sharing so everyone can see.</p>

          <p>Invite your friends to join in on the fun.</p>

          <div>
            <input readOnly={true} style={this.style.shareInput} type="text" value={this.state.shareLink} />
            <Button seed={5} format={'button'} assetFormat={'svg'} variation={'shareFacebook'} />
            <Button seed={4} format={'button'} assetFormat={'svg'} variation={'shareTwitter'} />
          </div>

          <div style={this.style.credits}>
            <p style={this.style.marginTop}>Inspired by the work of Ray and Charles Eames. Created by <a style={this.style.link} href="http://labour-ny.com/" target="_blank">Labour</a> for Herman Miller, Inc.</p>
          </div>

        </div>
      </div>
    );
  }
}

export default new Radium(Overlay);
