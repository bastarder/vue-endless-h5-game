import coolTimeEvent from './cool-time-event'
import Fight from '../js/fight'
import store from '../store'

const SkillEvent = function(hero, monster){
  this.hero = hero;
  this.monster = monster;
  this.keyDownFunc = null;
  this.start();
}

SkillEvent.prototype = {
  start (){
    this.end();
    this.keyDownFunc = event => { 
      let index;
      // 技能监听;
      let skillHotKey = store.state.ConfigStore.skillHotKey;
      index = skillHotKey.indexOf(event.keyCode);
      if(~index){
        let skill = this.hero.$skills[index];
        skill && Fight(this.hero, this.monster, skill);
      }
      // 物品监听;
      let itemHotKey = store.state.ConfigStore.itemHotKey;
      index = itemHotKey.indexOf(event.keyCode);
      if(~index){
        console.log('Use: $package',index);
        this.hero.use({
          position: '$package',
          index
        });
      }
    };
    document.addEventListener('keydown', this.keyDownFunc); 
  },
  end (){
    document.removeEventListener('keydown',this.keyDownFunc);
  }
}

export default SkillEvent;

