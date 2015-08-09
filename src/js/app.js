import Global from 'herman-miller/modules/global';
import Sound from 'herman-miller/modules/sound';

window.eamesInteractive = new Global(document.getElementById('herman-miller-interactive-experience'));
window.eamesInteractive.Sound = new Sound();
window.eamesInteractive.start();
