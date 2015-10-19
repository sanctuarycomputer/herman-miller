import { random } from 'herman-miller/modules/utils';
import Block from 'herman-miller/modules/block';
import Hashtag from 'herman-miller/modules/hashtag';
import Figure from 'herman-miller/modules/figure';
import Planetary from 'herman-miller/modules/planetary';
import Optical from 'herman-miller/modules/optical';
import Moire from 'herman-miller/modules/moire';
import Lunar from 'herman-miller/modules/lunar';
import Button from 'herman-miller/modules/button';

class Artboard extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {};
    this.state['artboardLifecycle'] = 'idle';
    this.state['wheelSet'] = Math.floor(random(0, 2));
    const Global = window.eamesInteractive;
    Global.onBoxOpen(() => {
      this.setState({
        artboardLifecycle: 'active'
      })
    });
  }

  componentDidMount() {
    const Global = window.eamesInteractive;
    Global.advanceReadiness();
  }

  style = {
    base: {
      width: "100%",
      height: "476px",
      position: 'absolute',
      transition: "opacity 5s",
      opacity: 0
    },
    active: {
      opacity: 1
    }
  }

  render() {
    let wheels;
    if (this.state.wheelSet === 1) {
      wheels = [
        <Planetary draggable={true} resizable={true} seed={1} format={'wheel'} assetFormat={'png'} assetCount={4} wheelIndex={1} />,
        <Moire draggable={true} resizable={true} seed={3} format={'wheel'} assetFormat={'png'} assetCount={2} wheelIndex={2} />,
        <Optical draggable={true} resizable={true} seed={5} format={'wheel'} assetFormat={'png'} wheelIndex={3} />
      ];
    } else {
      wheels = [
        <Planetary draggable={true} resizable={true} seed={2} format={'wheel'} assetFormat={'png'} assetCount={4} wheelIndex={1}/>,
        <Lunar draggable={true} resizable={true} seed={4} format={'wheel'} assetFormat={'png'} assetCount={2} wheelIndex={2}/>,
        <Optical draggable={true} resizable={true} seed={6} format={'wheel'} assetFormat={'png'} wheelIndex={3}/>
      ];
    }

    return (
      <div style={[this.style.base, this.style[this.state.artboardLifecycle]]}>
        <Figure seed={1} position={1} format={'figure'} assetFormat={'png'} assetCount={2} />
        <Figure seed={2} position={2} format={'figure'} assetFormat={'png'} assetCount={2} />
        <Figure seed={1} position={3} format={'figure'} assetFormat={'png'} assetCount={2} />
        
        <Block draggable={false} resizable={false} seed={1} format={'wall'} assetCount={2} assetFormat={'png'} />
        <Block draggable={false} resizable={false} seed={2} format={'wall'} assetCount={2} assetFormat={'png'} />
        <Block draggable={false} resizable={false} seed={3} format={'wall'} assetCount={2} assetFormat={'png'} />
        <Block draggable={false} resizable={false} seed={4} format={'wall'} assetCount={2} assetFormat={'png'} />

        <Block draggable={true} resizable={true} seed={1} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={2} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={3} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={4} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={5} format={'square'} assetCount={5} />
        <Block draggable={true} resizable={true} seed={6} format={'square'} assetCount={5} />

        <Block draggable={true} resizable={true} seed={1} format={'horiz'} assetCount={6} />
        <Block draggable={true} resizable={true} seed={1} format={'vert'} assetCount={6} />

        <Button seed={1} format={'button'} variation={'audio'} assetFormat={'svg'} assetCount={2} />
        <Button seed={3} format={'button'} variation={'info'} assetFormat={'svg'} assetCount={2} />

        <Hashtag seed={1} format={'hashtag'} assetFormat={'png'} assetCount={1} />

        {wheels[0]}
        {wheels[1]}
        {wheels[2]}
      </div>
    );
  }
}

export default new Radium(Artboard);
