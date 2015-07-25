import Figure from 'herman-miller/modules/figure';
import Block from 'herman-miller/modules/block';
import Wheel from 'herman-miller/modules/wheel';


class Artboard extends React.Component {
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
        <Figure seed={1}/>
        <Figure seed={2}/>

        <Block seed={1} draggable={true} resizable={true}/>
        <Block seed={2} draggable={true} resizable={true}/>
        <Block seed={3} draggable={true} resizable={true}/>
        <Block seed={4} draggable={true} resizable={true}/>

        <Wheel seed={1} draggable={true} resizable={false}/>
        <Wheel seed={2} draggable={true} resizable={false} />
      </div>
    );
  }
}

export default new Radium(Artboard);
