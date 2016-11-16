const SkillEvent = function(){
  this.start = function(hero, callback){
    var self = this;
    $(document).on('keydown',function(event){ 
      switch (event.keyCode){
        case 81: 
          var skill = hero.$skills[0];
          var force = self.coolTimeStart.call(skill);
          force && callback(skill);
          break;
        case 87:
          var skill = hero.$skills[1];
          var force = self.coolTimeStart.call(skill);
          force && callback(skill);
          break;
        case 69:
          var skill = hero.$skills[2];
          var force = self.coolTimeStart.call(skill);
          force && callback(skill);
          break;
      }
    }); 
   }
  this.coolTimeStart = function(){
    var self = this;
    if(self.coolTime > 0){
      console.warn('技能释放失败: [冷却中]', self)
      return false;
    }
    console.warn('技能释放成功: [', self.name ,']',self)
    self.coolTime = self.defaultTime;
    var timer = setInterval(function(){
      self.coolTime -= 10;
      if(self.coolTime < 0){
        self.coolTime = 0;
        clearInterval(timer);
      }
    },9);
    return true;
  }
  this.end = function(hero){
    $(document).off('keydown');
  }
}

export default SkillEvent;

