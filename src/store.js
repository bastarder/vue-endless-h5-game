import Vue from 'vue'
import Vuex from 'vuex'
import Unit from './js/unit-class'
import MAP_TABLE from './data/map-data'

const UPDATE_HERO = "UPDATE_HERO";

import MONSTER_DATA from './data/monster-data';
import SKILL_TABLE from "./data/skill-data";
import STATE_TABLE from "./data/state-data";
import {ITEM_TABLE} from './data/item-data';

Vue.use(Vuex)

var hero = new Unit(
  {
    $skills : [_.cloneDeep(SKILL_TABLE[0])],
    $status :[],
    $package : _.cloneDeep(ITEM_TABLE).concat(new Array(26))
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
    EVENT_MAP_DATA: null,
    UPDATE: 1,
  },
  mutations: {
    UPDATE(state){
      Vue.set(state,'UPDATE', Math.random() + Date.now());
    }
  }
})

export default store;
