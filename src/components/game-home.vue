<template>
  <div class="game-home">
    <router-link class="link map" to="/map">
      <div class="title text-center">出 征</div>
      <!--<embed class="center-block" src="./src/assets/home-map.svg"/>-->
    </router-link>
    <router-link class="link fight" to="/fight">
      <div class="title text-center">战 斗</div>
    </router-link>
    <router-link class="link shop" to="/fight">
      <div class="title text-center">商 店</div>
    </router-link>
    <!--<router-link class="link " to="/fight">铁匠铺</router-link>
    <router-link class="link " to="/fight">炼金术</router-link>-->
  </div>
</template>

<script>

export default {
  data () {
    return {
      unit : 1
    }
  },
  methods : {
    open(){

    }
  }
}

</script>

<style>

 .game-home .link{
   display: inline-block;
   color: white;
   border-radius: 4px;
   padding: 10px;
   text-decoration: none;
   box-shadow: 0px 0px 2px gray;
   position: absolute;
   opacity: 1;
   transition: opacity 0.5s ease;
   /*border: 7px solid #515151;*/
 }

 .game-home .link:hover{
   opacity: 0.5;
   transition: opacity 0.5s ease;
 }

 /* map */
 .game-home .map{
   background-color: #f2d04d;
   width: 160px;
   height: 200px;
   top: 70px;
   left: 120px;
 }

 .game-home .map .title{
   font-size: 20px;
 }

 /*.game-home .map embed{
   width: 140px;
   height: 140px;
   margin-top: 20px;
 }*/


 /* shop */
 .game-home .shop{
   background-color: #67c56b;
   width: 160px;
   height: 80px;
   top: 70px;
   left: 350px;
 }

 .game-home .shop .title{
   font-size: 20px;
 }

  /* fight */
 .game-home .fight{
   background-color: #78cef1;
   width: 160px;
   height: 80px;
   top: 190px;
   left: 350px;
 }

 .game-home .fight .title{
   font-size: 20px;
 }


</style>
