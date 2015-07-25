import { random } from 'herman-miller/modules/utils';

class Figure extends React.Component{
  constructor(props) {
    super(...arguments)
    this.state = ({
      seed: props.seed
    })
  }

  figureAnimation = Radium.keyframes({
    '0%': {left: '0'},
    '100%': {left: '100%'}
  });

  figureAnimation2 = Radium.keyframes({
    '0%': {left: '0'},
    '100%': {left: '100%'}
  });


  style = {
    base: {
      width: '50px',
      height: '200px',
      backgroundColor: 'blue',
      bottom: 0,
      left: 0,
      position: 'absolute',
      animationIterationCount: 'infinite',
      animationPlayState: 'running',
      animationFillMode: 'backwards',
      ':hover': {
        animationPlayState: 'paused',
        backgroundColor: 'red'
      }
    },

    1: {
      animationName: this.figureAnimation,
      animationDuration: '12s',
      animationTimingFunction: 'linear',
      animationDirection: 'alternate',
      animationDelay: '4s',
    },
    2: {
      backgroundColor: 'yellow',
      animationName: this.figureAnimation2,
      animationDuration: '16s',
      animationTimingFunction: 'linear',
      animationDirection: 'alternate-reverse',
      animationDelay: '2s',
    }
  }

  render() {
    return (
      <div style={[this.style.base, this.style[this.state.seed]]}></div>
    );
  }
}

/* Wrap Component with Radium for Styling Flow */
export default new Radium(Figure);