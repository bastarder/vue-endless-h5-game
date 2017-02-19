import Vue from 'vue';

const state = {
  intensifyItem : 0,
}

const mutations = {
  ChangeIntensifyItem (state, newItem){
    Vue.set(state, 'intensifyItem', newItem);
  }
}

export default {
  state,
  mutations
}