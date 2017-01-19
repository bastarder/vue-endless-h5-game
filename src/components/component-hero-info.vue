<template>
    <div class="component-hero-info" v-if="this.hero">
      <div class="info">
        <template v-for="(item,index) in this.hero.$equipments">
          <component-item :class="['equip-' + index , 'equip']" :item="item" :position-index="'$equipments|' + index">
            <span class="item-name" slot="item-name">{{item ? item.name : ''}}</span>
          </component-item>
        </template>
      </div>
      <div class="msg">
        <div v-for="key in this.infoKeyList">
          {{key}} : {{hero.getSnapshoot(key)}}
        </div>
      </div>
      <div class="test">
        <button type="button" class="btn btn-sm btn-info" @click="equip(3000003)">装备铁剑测试</button>
        <button type="button" class="btn btn-sm btn-info"  @click="demount(0)">卸下铁剑测试</button>
        <button type="button" class="btn btn-sm btn-info" @click="equip(3000004)">装备护肩测试</button>
        <button type="button" class="btn btn-sm btn-info"  @click="demount(1)">卸下护肩测试</button>
      </div>
    </div>
</template>

<script>
import PGET from '../js/public-static-get';
export default {
  data () {
    return {
      hero: {}
    }
  },
  created (){
    this.hero = this.$store.state.hero;
    this.infoKeyList = [ '$atk','$def', '$str', '$dex', '$con', '$int', '$maxHp', '$maxMp', '$critical', '$dodge', '$coolTimePer'];
  },
  methods :{
    equip (id){
      this.hero.equip(PGET(id));
      this.$forceUpdate();
    },
    demount(type){
      this.hero.demount(Number(type));
      this.$forceUpdate();
    }
  }
}
</script>

<style>
  .component-hero-info .info{

  }
</style>
