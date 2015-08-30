import Button from 'herman-miller/modules/button';

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
      padding: '30px 120px',
      color: 'white',
      fontFamily: 'Helvetica',
      fontWeight: 100,
      lineHeight: '26px',
      letterSpacing: '1px',
      fontSize: '18px'
    },
    shareInput: {
      padding: '10px',
      backgroundColor: 'transparent',
      outline: 'none',
      border: '2px solid white',
      color: 'white',
      fontFamily: 'Helvetica',
      fontWeight: 100,
      fontSize: '15px',
      float: 'left'
    },
    credits: {
      color: 'black',
      fontFamily: 'Helvetica',
      fontWeight: 100,
      lineHeight: '18px',
      letterSpacing: '1px',
      fontSize: '14px'
    },

    link: {
      textDecoration: 'none',
      color: 'black',
      fontWeight: 500
    }
  }

  render() {
    return (
      <div style={[
        this.style.base,
        this.style[this.state.overlayState]
      ]}>
        <Button seed={6} format={'button'} assetFormat={'svg'} variation={'overlayCross'} />
        <div style={this.style.copy}>
          <p>Compose and play with shape, color, texture and motion.</p>
          <p>Stretch and shrink objects from their upper left corner.</p>
          <p>Click on an object to bring up a new graphic.</p>
          <p>Play some jazz - or turn it down.</p>
          <p>Save a snapshot when you've composed somthing you like.</p>
          <p>Share the experience with other like minds:</p>

          <div>
            <input readOnly={true} style={this.style.shareInput} type="text" value={this.state.shareLink} />
            <Button seed={5} format={'button'} assetFormat={'svg'} variation={'shareFacebook'} />
            <Button seed={4} format={'button'} assetFormat={'svg'} variation={'shareTwitter'} />
          </div>

          <div style={this.style.credits}>
            <p>Designed and animated by <a style={this.style.link} href="http://labour-ny.com/" target="_blank">Labour</a></p>
            <p>Built by <a style={this.style.link} href="http://sanctuary.computer/" target="_blank">Sanctuary Computer</a></p>
          </div>

        </div>
      </div>
    );
  }
}

export default new Radium(Overlay);
