import Vue from 'vue'
import Vuex from 'vuex'

import FightStore from './store/fight-store';
import HeroStore from './store/hero-store';
import MapStore from './store/map-store';
import ConfigStore from './store/config-store';
import SmithyStore from './store/smithy-store';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    FightStore,
    HeroStore,
    MapStore,
    ConfigStore,
    SmithyStore,
  },
  state: {
    UPDATE: 1,
  },
  mutations: {
    UPDATE(state){
      Vue.set(state,'UPDATE', Math.random() + Date.now());
    },
  }
})

export default store;
