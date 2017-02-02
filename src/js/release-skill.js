import coolTimeEvent from './cool-time-event'
import Fight from '../js/fight'

const SkillEvent = function(hero, monster){
  this.hero = hero;
  this.monster = monster;
  this.Fight = function(skill){
    Fight(this.hero, this.monster, skill);
  };
  this.start = function(){
    this.end();
    this.keyDownFunc = event => { 
      let skill;
      switch (event.keyCode){
        case 81: 
          skill = this.hero.$skills[0];
          break;
        case 87:
          skill = this.hero.$skills[1];
          break;
        case 69:
          skill = this.hero.$skills[2];
          break;
        case 82:
          skill = this.hero.$skills[3];
          break;
      }
      skill && this.Fight(skill);
    };
    document.addEventListener('keydown', this.keyDownFunc); 
   }
  this.end = function(){
    _.each(this.hero.$skills, skill => {
      skill.coolTime = 0;
    })
    _.each(this.monster.$skills, skill => {
      skill.coolTime = 0;
    })
    document.removeEventListener('keydown',this.keyDownFunc);
  }
}

export default SkillEvent;

