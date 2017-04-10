<template>
  <div class="container" :style="{'margin-top':`${margin}px`,'transform': `scale(${scale})`}">
    <div class="main">
  <!--<div class="container">
    <div class="main">-->
      <div class="router-view" id="router-view">
        <transition enter-active-class="animated slow fadeIn">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '../api/login'
import {LoadGame} from "../js/save-load"

export default {
  data(){
    return {
      scale: 1,
      margin: 0,
    }
  },
  created(){
    window.onresize = ()=>{
      this.setPosition();
    }
    this.setPosition();
    LoadGame();
  },
  methods:{
    setPosition : function(){
      let height = window.innerHeight - 10;
      let height_original = 500;
      this.scale = height / height_original; 
      this.margin = (this.scale - 1) * height_original / 2
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
   margin: auto;
   width: 800px;
   border-radius: 2px;
   height: 500px;
 }
 .main{
   display: inline-block;
   width: 100%;
   height: 100%;
 }
 .router-view{
   position: relative;
   height: 500px;
   background: #252830;
   border-radius: 2px;
 }
 .router-view > div{
   position: absolute;
   height: 100%;
   width: 100%;
 }
</style>
