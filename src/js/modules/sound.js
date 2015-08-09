class Sound {
  constructor(el){

    this.single = [];
    this.snare = [];
    this.toms = [];

    this.loadSounds("single");
    this.loadSounds("snare");
    this.loadSounds("toms");
  }

  loadSounds(type){
    for(let i = 1; i <= 10; i++){
      let sound  = new Howl(
        {urls: [`/assets/sound/${type}_${i}.mp3`]})
      this[type].push(sound);
    }
  }

  return
}

export default Sound;
