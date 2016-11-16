import Vue from 'vue'
import Vuex from 'vuex'
import Unit from './js/unit-class'

const UPDATE_HERO = "UPDATE_HERO";

Vue.use(Vuex)

// console.log(Unit);
var hero = new Unit();
var monster = new Unit();

const store = new Vuex.Store({
  state: {
    hero,
    monster
  },
  mutations: {
    [UPDATE_HERO] (state, obj) {
      state.hero = obj;
    }
  }
})

export default store;
