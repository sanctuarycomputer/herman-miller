class Artboard extends React.Component {
  static propTypes = { 
    initialCount: React.PropTypes.number 
  }

  static defaultProps = { 
    initialCount: 0 
  }

  /* Constructor is passed initial Props */
  constructor(props) {
    super(props);
    console.log(`Artboard: Initialized with defaultProps: ${props}`);
    
    this.state = {
      count: props.initialCount
    }
  }
  
  /* Encapsulated Styling with State Based Modifiers*/
  style = {
    base: {
      width: "100%",
      height: "100%"
    },
    1: {
      "color": "wheat",
      "background-color": "lavender"
    },
    2: {
      "color": "lavender",
      "background-color": "wheat"
    }
  }

  /* Template Actions need `this` bound */
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  }

  /* Render Cycle runs when `this.state` changes */
  render() {
    return (
      <div style={[this.style.base, this.style[this.state.count]]}>
        Welcome to the Interactive Experience.

        <button onClick={this.handleClick}>
          Click Me! {this.state.count}
        </button>
      </div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Artboard);
