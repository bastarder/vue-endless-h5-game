import store from '../store';

// let dist = {
//   'backgroundMusic': require('static/audio/bgm.wav'),
//   'fight-attack' : require('static/audio/fight-attack.wav'),
// }

let dist = {};

let AudioList = [];
window.AudioList = AudioList;

let GameAudio = function (opt){
  this.$AudioList = AudioList;
  this.src = opt.src || dist[opt.key];
  this.id = this.src + Date.now();
  this.opt = Object.assign({
    autoplay : true,
    loop : false,
  },opt);
  // this.start();
}

GameAudio.prototype = {
  start : function(){
    let opt = this.opt;
    if(this.$el){
      this.stop();
    }
    this.$el = document.createElement('audio');
    this.$el.src = this.src;
    this.$el.volume = 0.2;
    (opt.autoplay) && (this.$el.autoplay = "autoplay");
    if(opt.loop){
      this.$el.loop = "loop";
    }else{
      this.$el.addEventListener('ended',() => this.stop(), false);
    }
    document.body.appendChild(this.$el);
    this.$AudioList.push(this.$el);
  },
  pause : function(){
    this.$el.pause();
  },
  stop : function(){
    this.$AudioList.splice(this.$AudioList.findIndex(a => a.id = this.id), 1);
    document.body.removeChild(this.$el);
    this.$el = null;
  }
}

export default GameAudio;

