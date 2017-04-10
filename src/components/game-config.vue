<template>
  <div class="game-config">
    <div class="item">
      <span>音效</span>
      <range-select v-model="option.volumeEffectMusic" :min="0" :max="1"/>
    </div>

    <div class="item">
      <span>音乐</span>
      <range-select v-model="option.volumeBackgroundMusic" :min="0" :max="1"/>
    </div>

    <div class="item">
      <span>技能日志</span>
      <switch-button v-model="option.skillAvailableFightTip"/>
    </div>

    <div class="item skillHotKey">
      <span>技能快捷键</span>
      <template v-for="(key,index) in option.skillHotKey">
        <hot-key-item class="hot-key" v-model.number="option.skillHotKey[index]"/>
      </template>
    </div>

    <div class="item itemHotKey">
      <span>物品快捷键</span>
      <template v-for="(key,index) in option.itemHotKey">
        <hot-key-item class="hot-key" v-model.number="option.itemHotKey[index]"/>
      </template>
    </div>

    <div class="tip" v-if="tip">
      {{tip}}
    </div>

    <a class="btn" @click="saveGame">保存游戏</a>

    <a class="btn" @click="save">保存配置</a>

    <a class="btn" @click="reset">重置游戏</a>

    <router-link class="btn" to="/">返回</router-link>

  </div>
</template>

<script>
import GameSwitchButton from './game-switch-button.vue';
import GameRangeSelect from './game-range-select.vue';
import GameHotKeyItem from './game-hot-key-item.vue';
import {SaveGame,LoadGame} from "../js/save-load"

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
    // LoadGame();
  },
  methods:{
    saveGame(){
      SaveGame();
    },
    reset(){
      localStorage.setItem('ENDLESS_QWHIDHIASDYQWD','');
      location.reload();
    },
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
    padding: 100px 210px;
    background: #252830;
    color: white;
    .hot-key{
      margin-right: 4px;
    }
    .item span:nth-child(1){
      display: inline-block;
      width: 100px;
      text-align: center;
      margin-right: 20px;
    }
    .item{
      margin-bottom: 8px;
    }
    .tip{
      text-align: center;
    }
    .btn{
      width: 100px;
      margin: 12px 40px;
    }
  }
</style>
