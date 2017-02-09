import Vue from 'vue'
import Vuex from 'vuex'
import Unit from './js/unit-class'
import MAP_TABLE from './data/map-data'

const UPDATE_HERO = "UPDATE_HERO";

import MONSTER_DATA from './data/monster-data';
import SKILL_TABLE from "./data/skill-data";
import STATE_TABLE from "./data/state-data";
import {ITEM_TABLE} from './data/item-data';
import PGET from './js/public-static-get';

Vue.use(Vuex)

let test1 = PGET(3000001);
test1.num = 10;
let test2 = PGET(3000002);
test2.num = 5;

var hero = new Unit(
  {
    $showName : 'Bastarder',
    $type    : 'Hero',
    $skills  : [_.cloneDeep(SKILL_TABLE[0]),_.cloneDeep(SKILL_TABLE[1]),_.cloneDeep(SKILL_TABLE[2]),_.cloneDeep(SKILL_TABLE[3])],
    $status  : [],
    $package : _.cloneDeep(ITEM_TABLE).slice(2).concat([test1,test2]).concat(new Array(26))
  }
);

const store = new Vuex.Store({
  state: {
    hero,
    mapList: _.cloneDeep(MAP_TABLE),
    FightScopeParm : {
      eventLogs : [],
      monsters : [
        new Unit(_.cloneDeep(MONSTER_DATA[0])),
        new Unit(_.cloneDeep(MONSTER_DATA[1]))
      ]
    },
    EVENT_MAP_DATA: null,
    UPDATE: 1,
  },
  mutations: {
    UPDATE(state){
      Vue.set(state,'UPDATE', Math.random() + Date.now());
    },
    // FightEvent;
    FightEventLogPush(state, log){
      if(!log){
        return ;
      }
      let now = new Date().toString().slice(16, 16 + 8);
      state.FightScopeParm.eventLogs.push(
        `<span class="color-darkblue">[${now}]</span> ${log}.`
      );
    },
    FightEventLogClear(state){
      Vue.set(state.FightScopeParm, 'eventLogs', []);
    }
  }
})

export default store;
