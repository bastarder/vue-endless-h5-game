<template>
  <div class="container">
    <!--<game-header></game-header>-->
    <div class="main">
      <div class="router-view">
        <router-view></router-view>
      </div>
      <!--<game-bottom></game-bottom>-->
    </div>
    <game-package></game-package>
    
  </div>
</template>

<script>
export default {}
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
   height: 440px;
   background: white;
   margin-top: 4px;
   padding: 6px;
 }

</style>
