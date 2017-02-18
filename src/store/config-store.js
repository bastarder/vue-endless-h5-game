import Vue from 'vue';

const state = {
  volumeEffectMusic : 0.5,
  volumeBackgroundMusic : 0.5,
  skillAvailableFightTip : true,
  skillHotKey : [81, 87, 69, 82],
  itemHotKey : [49, 50, 51, 52],
}

const mutations = {
  ConfigUpdate (state, option){

    // 修改音量
    for(let el of window.AudioList){
      el.volume = option.volumeBackgroundMusic;
    }

    Object.assign(state, option);

  }
}

export default {
  state,
  mutations
}