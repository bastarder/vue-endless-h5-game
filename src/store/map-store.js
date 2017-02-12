import Vue from 'vue';
import MAP_TABLE from '../data/map-data'

const state = {
  mapList: _.cloneDeep(MAP_TABLE),
  map: null,
}

const mutations = {

}

export default {
  state,
  mutations
}