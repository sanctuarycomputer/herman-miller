import Artboard from 'herman-miller/modules/artboard';

let el = document.getElementById('herman-miller-interactive-experience');

window.eamesInteractive = {
  assetPath: `${window.location.href}assets`
}

React.render(<Artboard />, el);
