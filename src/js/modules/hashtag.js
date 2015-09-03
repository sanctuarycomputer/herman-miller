class Hashtag extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      hashtagVisibility: 'hidden'
    }

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
      bottom: '-75px', 
      height: '75px',
      position: 'absolute',
      color: 'white',
      fontFamily: 'ff-meta-web-pro, Helvetica, Arial, sans-serif',
      fontWeight: 100,
      lineHeight: '18px',
      letterSpacing: '1px',
      fontSize: '14px',
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
        <p style={this.style.para}>Herman Miller & Eames Office</p> 
        <p style={this.style.para}>#eamesplay</p>
      </div>    
    )
  }
}

export default new Radium(Hashtag);
