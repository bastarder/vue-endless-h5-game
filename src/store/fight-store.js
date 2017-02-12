import Vue from 'vue';
import Unit from '../js/unit-class'
import MONSTER_DATA from '../data/monster-data';

const state = {
  eventLogs : [],
  monsters : [
    new Unit(_.cloneDeep(MONSTER_DATA[0])),
    new Unit(_.cloneDeep(MONSTER_DATA[1]))
  ]
}

// mutations
const mutations = {
  // FightEvent;
  FightEventLogPush(state, log){
    if(!log){
      return ;
    }
    let now = new Date().toString().slice(16, 16 + 8);
    state.eventLogs.push(
      `<span class="color-darkblue">[${now}]</span> ${log}.`
    );
  },
  FightEventLogClear(state){
    Vue.set(state, 'eventLogs', []);
  }
}

export default {
  state,
  mutations
}