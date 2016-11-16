import Vue from 'vue'
import Vuex from 'vuex'
import Unit from './js/unit-class'

const UPDATE_HERO = "UPDATE_HERO";

Vue.use(Vuex)

var hero = new Unit();
var monster = new Unit();

const store = new Vuex.Store({
  state: {
    hero,
    monster,
    EVENT_FIGHT_MONSTERS:[
      new Unit(),
      new Unit()
    ]
  },
  mutations: {
    [UPDATE_HERO] (state, obj) {
      state.hero = obj;
    }
  }
})

export default store;
