<template>
  <div class="container">
    <!--<game-header></game-header>-->
    <div class="main">
      <div class="router-view" id="router-view">
        <!--<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">-->
          <router-view></router-view>
        <!--</transition>-->
      </div>
      <!--<game-bottom></game-bottom>-->
    </div>
    <game-package></game-package>
    
  </div>
</template>

<script>
export default {
  data(){
    return {}
  },
  methods:{
    test(){
      console.log(123)
    }
  }
}
</script>

<style>
 body{
  background: #333333;  
  /* 淡色边框 #d3e0e9 */ 
  /* 舒服绿色 #5cb85c */
 }
 .container{
   padding: 6px;
   margin-top: 20px;
   width: 1000px;
   background: #A1A693;
 }
 .main{
   vertical-align: top;
   display:inline-block;
   border-top: 0px;
   border-bottom: 0px;
   width: 640px;
 }
 .router-view{
   position: relative;
   height: 440px;
   background: white;
   margin-top: 4px;
   padding: 6px;
 }

</style>
