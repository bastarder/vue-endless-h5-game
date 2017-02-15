<template>
  <div class="game-config">
    音效: <range-select v-model="option.volumeEffectMusic" :min="0" :max="1"/>{{option.volumeEffectMusic}}
    <br>
    音乐: <range-select v-model="option.volumeBackgroundMusic" :min="0" :max="1"/>{{option.volumeBackgroundMusic}}
    <br>
    技能失败日志: <switch-button v-model="option.skillAvailableFightTip"/> {{option.skillAvailableFightTip}}

    <div class="tip" v-if="tip">
      {{tip}}
    </div>

    <div class="skillHotKey">
      技能快捷键:<br>
      <template v-for="(key,index) in option.skillHotKey">
        <hot-key-item v-model.number="option.skillHotKey[index]"/>
      </template>
      {{option.skillHotKey}}
    </div>

    <div class="itemHotKey">
      物品快捷键:<br>
      <template v-for="(key,index) in option.itemHotKey">
        <hot-key-item v-model.number="option.itemHotKey[index]"/>
      </template>
      {{option.itemHotKey}}
    </div>

    <a class="btn" @click="save">保存</a>
    <router-link class="btn" to="/">返回</router-link>
  </div>
</template>

<script>
import GameSwitchButton from './game-switch-button.vue';
import GameRangeSelect from './game-range-select.vue';
import GameHotKeyItem from './game-hot-key-item.vue';

export default {
  components:{
    'switch-button' : GameSwitchButton,
    'range-select' : GameRangeSelect,
    'hot-key-item' : GameHotKeyItem,
  },
  data(){
    return {
      option : {},
      tip : '',
    }
  },
  created(){
    this.option = this.$store.state.ConfigStore;
  },
  methods:{
    save(){
      this.tip = "";
      // 检查热键冲突
      let obj = {};
      let keyList = this.option.skillHotKey.concat(this.option.itemHotKey);
      for(let i = 0; i< keyList.length; i++){
        let key = keyList[i];
        if(obj[key]){
          this.tip = "热键冲突,请检查快捷键设置,保存失败!"
          return;
        }else{
          obj[key] = 1;
        }
      }
      this.$store.commit('ConfigUpdate',this.option)
      this.tip = "保存成功!"
    },
  }
}
</script>

<style scoped lang="less">
  .game-config{
    padding: 30px;
    height: 100%;
    background: #252830;
    color: white;
  }
</style>
