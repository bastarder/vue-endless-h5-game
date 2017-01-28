<template>
  <div class="game-map">
    <div class="bottom">
      <router-link class="back-btn" to="/">
        <i class="fa fa-reply" aria-hidden="true"></i> 回 家
      </router-link>
    </div>
    <div class="list">
      <template v-for="map in this.mapList">
        <div class="item" @click="goTo(map)">
          <span class="name">
            {{ map.name }}
          </span> 
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
   background: #fff6cb;
   height: 100%;
   .list{
     padding: 10px;
     height: 440px;
     overflow-x: hidden; 
     .item{
        user-select: none;
        display: inline-block;
        position: relative;
        border: 1px solid black;
        cursor: pointer;
        margin-bottom: 12px;
        padding: 10px 20px;
        width: 300px;
        margin-left: 48px;
        font-size: 17px;
        border-radius: 2px;
        height: 66px;
        vertical-align: top;
        overflow: hidden;
       .name{
         display: inline-block;
         text-align: center;
         width: 260px;
         font-size: 30px;
         transition: width 0.3s;
       }
       .level{
         display: none;
       }
       .dsc{
         display: block;
         font-size: 12px;
         margin-left: 300px;
       }
     }
     .item:hover{
       box-shadow: 0px 0px 2px black inset;
       transition: 0.3s;
       .name{
         display: inline-block;
         text-align: center;
         font-size: 18px;
         width: 60px;
       }
       .dsc{
         margin-left: 10px;
         transition: 0.3s;
       }
     }

   }
   .bottom{
     height: 60px;
     border-top: 2px solid green;
     padding: 20px 58px;
     .back-btn{
       border: 1px solid gray;
       border-radius: 2px;
       padding: 4px 8px;
       color: black;
       text-decoration: none;
     }
     .back-btn:hover{
       box-shadow: 0px 0px 1px black inset;
     }
   }
 }
</style>
