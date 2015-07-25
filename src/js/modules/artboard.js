import Assetable from 'herman-miller/modules/assetable';
import Figure from 'herman-miller/modules/figure';
import Block from 'herman-miller/modules/block';
import Wheel from 'herman-miller/modules/wheel';

class Artboard extends Assetable {
  constructor(props) {
    super(...arguments);
    const Global = window.eamesInteractive;
    this.state['lifecycle'] = 'loading';

    Global.onReady(() => {
      this.setState({ lifecycle: 'ready' });
    });
  }

  componentDidMount() {
    const Global = window.eamesInteractive;
    Global.advanceReadiness();
  }

  style = {
    base: {
      width: "100%",
      height: "100%",
      opacity: 0,
      transition: '1s all',
      backgroundColor: "#262436"
    },
    loading: {

    },
    ready: {
      opacity: 1,
      backgroundImage: `url(${this.state.assets[0]})`
    }
  }

  render() {
    return (
      <div style={[this.style.base, this.style[this.state.lifecycle]]}>
        <Figure number={1} seed={1} format={'figure'} assetCount={2} />

        <Block draggable={true} resizable={true} seed={1} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={2} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={3} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={4} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={5} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={6} format={'square'} assetCount={5} />

        <Wheel draggable={true} resizable={false} seed={1} format={'wheel'} />
        <Wheel draggable={true} resizable={false} seed={2} format={'wheel'} />
      </div>
    );
  }
}

export default new Radium(Artboard);
