<template>
  <div class="game-header">
    <span class="season">秋</span>
    第
    <span class="dayNum">{{ dayNum }}</span>
    日
    {{ state }}
    <div class="state"></div>
    :
    <span class="place">{{ place }}</span>
  </div>
</template>

<script>

export default {
  data () {
    return {
      season: '春',
      dayNum: 12,
      state: '下午',
      place: '神圣之塔'
    }
  }
}
</script>

<style>
 .game-header{
   height: 50px;
   line-height: 50px;
   padding: 0px 8px;
   font-size: 18px;
   font-width: 700px;
   color: white;
   background-color: #C8D0B1;
 }
 .game-header .season{
   background:white;
   padding: 2px 4px;
   color: green;
 }
 .game-header .dayNum{
   background: white;
   padding: 2px 4px;
   color: black;
 }
 .game-header .state{
   background: white;
   width: 28px;
   height: 26px;
   display:inline-block;
   vertical-align: middle;
   color: cadetblue;
 }
</style>
