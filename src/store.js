import Vue from 'vue'
import Vuex from 'vuex'
import Unit from './js/unit-class'
import MAP_TABLE from './data/map-data'

const UPDATE_HERO = "UPDATE_HERO";

import MONSTER_DATA from './data/monster-data';
import SKILL_TABLE from "./data/skill-data";
import STATE_TABLE from "./data/state-data";

Vue.use(Vuex)

var hero = new Unit(
  {
    $skills : _.cloneDeep(SKILL_TABLE),
    $status :[]
  }
);

const store = new Vuex.Store({
  state: {
    hero,
    mapList: _.cloneDeep(MAP_TABLE),
    NOTICE_ITEM: null,
    EVENT_FIGHT_MONSTERS:[
      new Unit(_.cloneDeep(MONSTER_DATA[0])),
      new Unit(_.cloneDeep(MONSTER_DATA[1]))
    ],
    EVENT_MAP_DATA: null
  },
  mutations: {
    [UPDATE_HERO] (state, obj) {
      Vue.set(state.hero, '$package', [])
      console.log(obj);
      Vue.set(state.hero, '$package', obj)
    }
  }
})

export default store;
