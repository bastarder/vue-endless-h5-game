<template>
  <div class="container">
    <div class="main">
      <div class="router-view" id="router-view">
        <router-view></router-view>
      </div>
    </div>
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

<style lang="less">
 *{
   -webkit-box-sizing: border-box;
   user-select: none;
 }
 .container{
  //  padding: 6px 6px 0px 6px;
   margin-top: 20px;
   width: 800px;
   background: #A1A693;
   border-radius: 2px;
   margin-right: auto;
   margin-left: auto;
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
