const FightStage = function(opt){
  this.x = opt.x || 300;
  this.y = opt.y || 300;
  this.canvas = document.getElementById(opt.selector || 'fight-wall');
  this.data = [];
}

FightStage.prototype = {
  start : function(){

  },
  stop : function(){

  },
  add : function(item){
    this.data.push(item);
  },
  remove : function(){
    
  }
}

const canvasItem = function(opt){
  this.x = opt.x || 0;
  this.y = opt.y || 0;
  this.width = opt.width || 300;
  this.height = opt.height || 150;
  this.infinite = opt.infinite || false;
  this.continueTime = opt.continueTime || 0;
  this.i = 0;

  // 处理图片资源;
  this.animations = _.map(new Array(opt.animationLength),(v,i)=>{
    let img = new Image();
    img.src = `../src/assets/${opt.id}/${i}.png`;
    return img;
  })

  // 处理持续性动画;
  if(this.continueTime){
    this.infinite = true;
    setTimeout(()=>{
      this.infinite = false;
      this.shouldBeRemove = true;
    },this.continueTime);
  }

}

canvasItem.prototype = {
  next (){
    if(!this.animations[++this.i]){
      this.infinite ? this.i = 0 : this.shouldBeRemove = true;
    }
  },
  render (canvas){
    canvas.clearRect(0,0,300,300);
    canvas.drawImage(
      this.animations[this.i],
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.next();
  }
}


export default canvasItem;