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
        <span v-for="key in this.infoKeyList">
          【{{key}} : {{hero.$r[key]}}】
        </span>
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
  watch:{
    '$store.state.UPDATE' : function(item){
      this.$forceUpdate();
    },
  },
  created (){
    this.hero = this.$store.state.hero;
    this.infoKeyList = [ '$atk','$def', '$str', '$dex', '$con', '$int', '$maxHp', '$maxMp', '$critical', '$dodge', '$coolTimePer', '$critiDmg', '$dmgDown'];
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

</style>
