<template>
  <div class="game-bottom">
    <span class="attr">回家</span>
    <span class="attr">出征</span>
    <span class="attr">商店</span>
    <router-link class="attr" to="/home">回家</router-link>
    <router-link class="attr" to="/fight">战斗测试</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'game-header'
    }
  }
}
</script>

<style>
  .game-bottom{
    margin-top: 4px;
  }
  .game-bottom .attr{
    min-width: 71px;
    text-shadow: 1px 1px 30px #000;
    box-shadow: 1px 1px 3px #444;
    line-height: 36px;
    margin-right: 10px;
    background: rgb(162,184,168);;
    color: white;
    padding: 0px 5px;
    display: inline-block;
  }
  .game-bottom .attr:hover{
    box-shadow: 1px 1px 5px #515724;  
    cursor: pointer;
  }
</style>


  <!--<ul class="game-bottom nav nav-pills nav-justified" role="tablist">
    <li class="first"><router-link to="/foo">Test1</router-link></li>
    <li><router-link to="/bar">Test2</router-link></li>
    <li><router-link to="/test1">Test3</router-link></li>
    <li class="last"><router-link to="/test4">Test4</router-link></li>
  </ul>-->
      <!--<span class="attr">智力</span>
    <span class="attr">体力</span>
    <span class="attr">敏捷</span>-->