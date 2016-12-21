<template>
  <div class="game-map">
    <router-link class="btn btn-info btn-sm" to="/">
      <i class="fa fa-reply" aria-hidden="true"></i> 回 家
    </router-link>
    <hr>
    <div class="list-group">
      <template v-for="map in mapList">
        <div class="map-item list-group-item">
          <span class="name">{{ map.name }}</span> 
          <span class="dsc">{{ map.dsc }}</span>
          <button class="btn btn-success btn-sm goto" @click="goTo(map)"> 出发</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import MapInit from '../js/map-init';

export default {
  data () {
    return {
      mapList : [],
    }
  },
  created (){
    this.mapList = this.$store.state.mapList;
  },
  methods : {
    goTo (map){
      this.$store.state.EVENT_MAP_DATA = new MapInit(map);
      location.href = '#/map-active';
    }
  }
}

</script>

<style>
 .game-map{
   padding: 16px;
 }

 .game-map hr{
   margin: 15px 0px;
 }

 .game-map .map-item .goto{
   float: right;
 }
 
 .game-map .map-item .name{
   font-size: 21px;
   font-weight: 800;
   display: inline-block;
   margin-right: 10px;
 }

 .game-map .map-item .dsc{
   color: gray;
 }


</style>
