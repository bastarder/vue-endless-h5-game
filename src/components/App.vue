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
    <!--<game-package></game-package>-->
    
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
    /* background-image: url('../assets/hero-1.png'); */
    background: #333333;
    /* 淡色边框 #d3e0e9 */ 
    /* 舒服绿色 #5cb85c */
  }
</style>

<style scoped lang="less">
 .container{
   padding: 6px 6px 0px 6px;
   margin-top: 20px;
   width: 800px;
   background: #A1A693;
   border-radius: 2px;
 }
 .main{
   display: inline-block;
   width: 100%;
   height: 100%;
 }
 .router-view{
   position: relative;
   height: 500px;
   background: white;
   border-radius: 2px;
 }
</style>
