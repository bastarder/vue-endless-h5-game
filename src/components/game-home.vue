<template>
  <div class="game-home">
    <router-link class="link" to="/map">出征</router-link>
    <router-link class="link" to="/fight">战斗测试</router-link>
    <router-link class="link" to="/fight">商店</router-link>
    <router-link class="link" to="/fight">铁匠铺</router-link>
    <router-link class="link" to="/fight">炼金术</router-link>
  </div>
</template>

<script>

export default {
  data () {
    return {
      unit : 1
    }
  }
}

</script>

<style>
 .game-home{
   text-align: center;
   line-height: 440px;
   height: 440px;
 }

 .game-home .link{
   color: black;
   border: 1px solid #888;
   border-radius: 4px;
   padding: 10px;
   text-decoration: none;
 }
</style>
