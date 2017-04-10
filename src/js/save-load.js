import Unit from '../js/unit-class'
import MAP_TABLE from '../data/map-data'
import MONSTER_DATA from '../data/monster-data';
import SKILL_TABLE from "../data/skill-data";
import STATE_TABLE from "../data/state-data";
import {ITEM_TABLE} from '../data/item-data';
import PGET from '../js/public-static-get';
import store from '../store';
import Vue from 'vue';

let SaveKey = 'ENDLESS_QWHIDHIASDYQWD';

const SaveGame = function(){
  // hero
  // config
  // store.state.HeroStore.hero = hero;

  let hero = _.cloneDeep(store.state.HeroStore.hero);
  let config = _.cloneDeep(store.state.ConfigStore);

  hero.__proto__ = {};
  
  delete hero.$r;
  delete hero.$flashCopy;
  delete hero.$attrGrow;

  // 处理特殊物品,技能,状态;
  // for(let key of ['$status','$skills','$package','$houseList','$equipments']){
  //   if(!hero[key]) continue;
  //   hero[key] = hero[key].map(v => {
  //     return pack(v);
  //   })
  // }

  let saveString = JSON.stringify({
    hero,
    config,
  });

  localStorage.setItem(SaveKey,saveString);

}

function pack(v){

  if(!v){
    return 0;
  }
  if(v.equip && v.intensify){
    return {
      id: v.id,
      intensify : v.intensify,
      intPowerUp : v.intPowerUp,
    };
  }
  return v.id
}

function unpack(v){
  if(!v){
    return undefined;
  }
  if(typeof v === 'number'){
    return PGET(v)
  }else{
    return Object.assign(PGET(v.id), v);
  }
}

const LoadGame = function(){

  let saveString = localStorage.getItem(SaveKey);

  // console.log(saveString);
  saveString = '';

  if(saveString){
    let {hero, config} = _.cloneDeep(JSON.parse(saveString));

    for(let key of ['$status','$skills','$package','$houseList','$equipments']){
      if(!hero[key]) continue;
      hero[key] = hero[key].map(v => {
        // console.log(unpack(v));
        return unpack(v);
      })
    }

    Vue.set(store.state.HeroStore,'hero', new Unit(hero));
    store.commit('ConfigUpdate', config);
  }else{
    // 生成默认测试英雄
    let test1 = PGET(3000001);
    test1.num = 10;
    let test2 = PGET(3000002);
    test2.num = 5;

    var hero = new Unit(
      {
        $showName : 'Bastarder',
        $type    : 'Hero',
        $skills  : [PGET(1000001),PGET(1000002),PGET(1000003),PGET(1000004)],
        $status  : [],
        $resource : {
          gold: 999999999,
          gem : 899999
        },
        $blueprint: [
          4000001, 4000002
        ],
        $package : [test1,test2].concat(_.cloneDeep(ITEM_TABLE).slice(2)).concat(new Array(26))
      }
    );
    Vue.set(store.state.HeroStore,'hero', hero);
  }

  SaveGame();

}


export {
  SaveGame,
  LoadGame
}