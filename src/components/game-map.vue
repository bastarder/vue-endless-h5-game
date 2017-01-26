<template>
  <div class="game-map">
    <router-link class="btn btn-info btn-sm" to="/">
      <i class="fa fa-reply" aria-hidden="true"></i> 回 家
    </router-link>
    <hr>
    <div class="list">
      <template v-for="map in mapList">
        <div class="item" @click="goTo(map)">
          <span class="name">{{ map.name }}</span> 
          <span class="dsc">{{ map.dsc }}</span>
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

    }
  },
  computed :{
    mapList : function(){
      return this.$store.state.mapList;
    }
  },
  created (){

  },
  methods : {
    goTo (map){
      this.$store.state.EVENT_MAP_DATA = new MapInit(map);
      location.href = '#/map-active';
    }
  }
}

</script>

<style scoped lang="less">
 .game-map{
   .list{
     padding: 10px;
     .item{
       user-select: none;
       cursor: pointer;
       border: 1px solid gray;
       margin-bottom: 12px;
       padding: 20px;
       font-size: 17px;
       border-radius: 2px;
       border-left: 4px solid green;
       transition: 0.3s;
       height : 66px;
       .name{
         color: black;
         margin-left: 0px;
         transition: 0.3s;
       }
     }
     .item:hover{
       .name{
         color: white;
         margin-left: 50px;
         transition: 0.6s;
       }
       background: red;
       color: white;
       transition: 0.6s;
       height: 100px;
     }

   }
 }
</style>
