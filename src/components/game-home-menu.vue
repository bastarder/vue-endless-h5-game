<template>
  <div class="game-home-menu">
    <template v-for="item in menu">
      <router-link class="link" :to="item[2]" :style="{'width': Math.floor(1 / menu.length * 100) + '%'}">
        <div class="title text-center">
          <span>{{item[0][0]}}</span>{{item[0][1]}}
        </div>
        <div class="e-title">
          {{item[1]}}
        </div>
        <img :src="item[3]"/>
      </router-link>
    </template>
  </div>
</template>

<script>

export default {
  data () {
    return {
      menu : [
        ['出征', 'Fight', '/map', require('static/menu-fight.png')],
        ['锻造', 'Equip', '/smithy', require('static/menu-forge.png')],
        ['商店', 'Shop', '/shop', require('static/menu-shop.png')],
        ['设置', 'Option', '/config', require('static/menu-setting.png')],
      ]
    }
  }
}
</script>

<style scoped lang="less">
  .game-home-menu{
    word-spacing:-4px;
    display: table;
    width: 100%;
    height: 220px;
    .link{
      text-decoration: none;
      position: relative;
      vertical-align: top;
      display: inline-block;
      height: 100%;
      min-height: 220px;
      color: rgb(207, 210, 218);
      padding-right: 6px;
      overflow: hidden;
      .title{
        text-align: right;
        span:first-child{
          font-size: 24px;
        }
      }
      .e-title{
        font-size: 10px;
        text-align: right;
      }
      img{
        opacity: 0;
        position: absolute;
        width: 100px;
        top: 50px;
        left: 50px;
        transition: 0.2s;
      }
      transition: 0.2s;
    }
    .link:hover{
      text-decoration: none;
      background: #1bc98e;
      color: white;
      transition: 0.3s;
      img{
        opacity: 1;
        top: 80px;
        left: 8px;
        transition: 0.3s;
      }
    }
  }
</style>
