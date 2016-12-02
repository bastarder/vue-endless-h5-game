import Vue from 'vue'
import Vuex from 'vuex'
import Unit from './js/unit-class'
import MAP_TABLE from './data/map-data'

const UPDATE_HERO = "UPDATE_HERO";
import MONSTER_DATA from './data/monster-data';

Vue.use(Vuex)

var hero = new Unit();
var monster = new Unit();

const store = new Vuex.Store({
  state: {
    hero,
    monster,
    mapList: _.cloneDeep(MAP_TABLE),
    NOTICE_ITEM: null,
    EVENT_FIGHT_MONSTERS:[
      new Unit(MONSTER_DATA[0]),
      new Unit(MONSTER_DATA[1])
    ],
    EVENT_MAP_DATA: null
  },
  mutations: {
    [UPDATE_HERO] (state, obj) {
      state.hero = obj;
    }
  }
})

export default store;
