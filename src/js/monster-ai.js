import Fight from './fight';
import SkillAvailable from './skill-available';

const MonsterAI = function(hero, monster){
  
  this.monster = monster;

  this.hero = hero;

  this.startTimer = null;

  this.start = function(){
    let delay = 1100;
    this.startTimer = setInterval(() => {
      let skill = this.monster.EventAI && this.monster.EventAI() || this.normalAi();
      skill && Fight(this.monster, this.hero, skill) && console.info('AI自动释放:' , skill.name);
    },delay)
  };

  this.end = function(){
    this.startTimer && clearInterval(this.startTimer);
  };

  this.normalAi = function (){
    let skills = this.monster.$skills;
    for(let i = 0; i< skills.length; i++){
      if(SkillAvailable(skills[i], this.monster, this.hero)){
        return skills[i];
      }
    };
    return false;
  }

  this.start();

}

export default MonsterAI;