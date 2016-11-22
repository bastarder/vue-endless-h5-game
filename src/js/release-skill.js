import coolTimeEvent from './cool-time-event'

const SkillEvent = function(hero,callback = function(){}){
  this.hero = hero;
  this.callback = callback;
  this.start = function(){
    var self = this;
    $(document).on('keydown',function(event){ 
      switch (event.keyCode){
        case 81: 
          var skill = self.hero.$skills[0];
          self.callback(skill);
          break;
        case 87:
          var skill = self.hero.$skills[1];
          self.callback(skill);
          break;
        case 69:
          var skill = self.hero.$skills[2];
          self.callback(skill);
          break;
        case 82:
          var skill = self.hero.$skills[3];
          self.callback(skill);
          break;
      }
    }); 
   }
  this.end = function(){
    _.each(this.hero.$skills, skill => {
      skill.coolTime = 0;
    })
    $(document).off('keydown');
  }
}

export default SkillEvent;

