import Block from 'herman-miller/modules/block';
import Figure from 'herman-miller/modules/figure';
import Planetary from 'herman-miller/modules/planetary';
import Optical from 'herman-miller/modules/optical';
import Moire from 'herman-miller/modules/moire';
import Lunar from 'herman-miller/modules/lunar';

const SIZE = 17.5;

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

  blocks = {
    count: 6,
    props: {
      seed: 1, // default
      widthHeightVmins: [SIZE, SIZE],
      draggable: true,
      resizable: true,
      assetCount: 5,
    }
  }

  wheels = {
    count: 2,
    props: {
      widthHeightVmins: [SIZE, SIZE],
      draggable: true,
      resizable: true,
      format: 'wheel',
      assetFormat: 'png'
    }
  }

  render() {

    let blockProps = this.blocks.props;
    let wheelProps = this.wheels.props;

    let blockElements = [];

    // Add square blocks
    for (let i = 1; i <= this.blocks.count; i++) {
      blockElements.push(<Block {...blockProps} seed={i} />);
    }

    blockElements.push(
      <Block {...blockProps} widthHeightVmins={[SIZE * 2, SIZE * 1]} assetCount={6} />,
      <Block {...blockProps} widthHeightVmins={[SIZE * 1, SIZE * 2]} assetCount={6} />
    )

    // Do the render:
    return (
      <div style={[this.style.base]}>
        <Figure seed={1} format={'figure'} assetCount={2} />
        <Figure seed={2} format={'figure'} assetCount={2} />
                                   
        <Planetary {...wheelProps} seed={1} assetCount={4} />
        <Planetary {...wheelProps} seed={2} assetCount={4} />
        
        <Moire {...wheelProps} seed={3} assetCount={2} />
        <Lunar {...wheelProps} seed={4} assetCount={2} />
        
        <Optical {...wheelProps} seed={5} />
        <Optical {...wheelProps} seed={6} />
        
        {blockElements}

      </div>
    );
  }
}

export default new Radium(Artboard);
