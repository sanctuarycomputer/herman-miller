import Assetable from 'herman-miller/modules/assetable';
import Block from 'herman-miller/modules/block';
import Wheel from 'herman-miller/modules/wheel';

class Artboard extends React.Component {
  componentDidMount() {
    const Global = window.eamesInteractive;
    Global.advanceReadiness();
  }

  style = {
    base: {
      width: "100%",
      height: "100%",
      backgroundColor: "#262436"
    }
  }

  render() {
    return (
      <div style={[this.style.base]}>
        <Block draggable={true} resizable={true} seed={1} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={2} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={3} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={4} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={5} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={6} format={'square'} assetCount={5} />
                                                          
        <Wheel draggable={true} resizable={true} seed={1} format={'wheel'} />
        <Wheel draggable={true} resizable={true} seed={2} format={'wheel'} />
      </div>
    );
  }
}

export default new Radium(Artboard);
