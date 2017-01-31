<template>
  <div class="game-home-menu">
    <template v-for="item in this.menu">
      <router-link class="link" :to="item[2]">
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
        ['锻造', 'Equip', '/fight', require('static/menu-forge.png')],
        ['商店', 'Shop', '/hero-info', require('static/menu-shop.png')],
        ['设置', 'Option', '/map', require('static/menu-setting.png')],
      ]
    }
  }
}
</script>

<style scoped lang="less">
  .game-home-menu{
    word-spacing:-4px;
    display: table;
    width: 264px;
    height: 220px;
    background: #fff6cb;
    .link{
      position: relative;
      vertical-align: top;
      display: inline-block;
      width: 66px;
      height: 100%;
      background: #fff6cb;
      color: black;
      padding-right: 6px;
      .title{
        text-align: right;
        span:first-child{
          font-size: 24px;
        }
      }
      .e-title{
        font-size: 10px;
        text-align: right;
        margin-top: -8px;
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
      background: #ffb11c;
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
