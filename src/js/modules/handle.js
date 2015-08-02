import Assetable from 'herman-miller/modules/assetable';

class Handle extends Assetable {
  style = {
    width: '20px',
    height: '20px',
    position: 'absolute',
    top: 0,
    left: 0,
    cursor: `url(${this.state.assets[0]}), nwse-resize`
  }

  render() {
    return (
      <div className="handle" style={this.style}/>
    );
  }
}

export default new Radium(Handle);
