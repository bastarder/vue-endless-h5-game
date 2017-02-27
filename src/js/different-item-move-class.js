import store from '../store';

let hero = store.state.HeroStore.hero;

const eventList = {
  $intensify : {
    get: function(){
      return store.state.SmithyStore.intensifyItem;
    },
    set: function(obj){
      store.commit('ChangeIntensifyItem', obj);
    }
  },
  $default : {
    get: function(){
      return hero && hero[this.position] && hero[this.position][this.index];
    },
    set: function(obj){
      hero[this.position][this.index] = obj;
    }
  }
}

const moveClass = function(option){

  let opt = option.split('|');

  this.position = opt[0];

  this.index = Number(opt[1]);

  this.get = function(){
    throw new Error('移动物品品种类, item方法必须指定!');
  }

  this.set = function(){
    throw new Error('移动物品品种类, set方法必须指定!');
  }

  Object.assign(this, eventList[this.position] || eventList['$default'])
  
}

 export default moveClass;