import Assetable from 'herman-miller/modules/assetable';
import Block from 'herman-miller/modules/block';
import Figure from 'herman-miller/modules/figure';
import Planetary from 'herman-miller/modules/planetary';
import Optical from 'herman-miller/modules/optical';
import Moire from 'herman-miller/modules/moire';
import Lunar from 'herman-miller/modules/lunar';

class Artboard extends React.Component {
  componentDidMount() {
    const Global = window.eamesInteractive;
    Global.advanceReadiness();
  }

  style = {
    base: {
      width: "100%",
      height: "100%"
    }
  }

  render() {
    return (
      <div style={[this.style.base]}>
        <Figure seed={1} format={'figure'} assetCount={2} />
        <Figure seed={2} format={'figure'} assetCount={2} />
        <Figure seed={3} format={'figure'} assetCount={2} />

        <Block draggable={true} resizable={true} seed={1} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={2} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={3} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={4} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={5} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={6} format={'square'} assetCount={5} />
        
        <Block draggable={true} resizable={true} seed={1} format={'horiz'} assetCount={6} />
        <Block draggable={true} resizable={true} seed={1} format={'vert'} assetCount={6} />
                                                          
        <Planetary draggable={true} resizable={false} seed={1} format={'wheel'} assetFormat={'png'} assetCount={4} />
        <Planetary draggable={true} resizable={false} seed={2} format={'wheel'} assetFormat={'png'} assetCount={4} />
        
        <Moire draggable={true} resizable={false} seed={3} format={'wheel'} assetFormat={'png'} assetCount={2} />
        <Lunar draggable={true} resizable={false} seed={4} format={'wheel'} assetFormat={'png'} assetCount={2} />
        
        <Optical draggable={true} resizable={false} seed={5} format={'wheel'} assetFormat={'png'} />
        <Optical draggable={true} resizable={false} seed={6} format={'wheel'} assetFormat={'png'} />
      </div>
    );
  }
}

export default new Radium(Artboard);
