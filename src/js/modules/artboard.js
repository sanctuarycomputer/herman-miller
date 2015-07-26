import Assetable from 'herman-miller/modules/assetable';
import {vmin} from 'herman-miller/modules/utils';
import Block from 'herman-miller/modules/block';
import Figure from 'herman-miller/modules/figure';
import Planetary from 'herman-miller/modules/planetary';
import Optical from 'herman-miller/modules/optical';
import Moire from 'herman-miller/modules/moire';
import Lunar from 'herman-miller/modules/lunar';

class Artboard extends React.Component {
  constructor(props) {
    super(...props);

    let numPerRow = this.blocks.count >> 1;
    let blockDimensions = vmin() * 20;

    for (let i = 0; i < this.blocks.count; i++) {
      this.blocks.coordinates.push({
        x: blockDimensions * (i % numPerRow),
        y: blockDimensions * Math.floor(i / numPerRow)
      });
    }
  }

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

  blocks = {
    count: 6,
    props: {
      draggable: true,
      resizable: true,
      format: 'square',
      assetCount: 5,
    },
    coordinates: []
  }

  wheels = {
    count: 2,
    props: {
      draggable: true,
      resizable: true,
      format: 'wheel'
    },
    coordinates: []
  }

  render() {
    let blockElements = [];
    for (let i = 1; i <= this.blocks.count; i++) {
      blockElements.push(<Block {...this.blocks.props} seed={i} coordinates={this.blocks.coordinates[i - 1]} />);
    }

    return (
      <div style={[this.style.base]}>
        <Figure seed={1} format={'figure'} assetCount={2} />
        <Figure seed={2} format={'figure'} assetCount={2} />

        {blockElements}

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
