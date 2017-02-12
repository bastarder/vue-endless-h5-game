<template>
  <div class="game-login">
    <div class="left">
      <ul>
        <li>目前只是一个测试的登录页面,点击登录按钮就可以直接进入</li>
        <li>游戏的基本流程已经大致完成</li>
        <li>如果你有兴趣提交一个有趣的技能,或者装备</li>
        <li>如果你有兴趣一起参与开发</li>
        <li>如果你认为我的贴图很丑,想给我提供更好的图片</li>
        <li>请你们联系QQ: 85257684</li>
      </ul>
    </div><!--

 --><div class="right"> 
      <transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
        <div class="login" v-if="opt.isLoginType">
          <div class="title">登录战斗</div>
          <div class="label">账号</div>
          <input type="text" class="username"/>
          <div class="label">密码</div>
          <input type="text" class="password"/>
          <a class="goToRegister" @click="opt.isLoginType = false">注册账号</a>
          <button class="btn login-btn" @click="testa">登录</button>
        </div>
      </transition>

      <transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight">
        <div class="register" v-if="!opt.isLoginType">
          <div class="title">注册成为英雄</div>
          <div class="label">账号</div>
          <input type="text" class="username"/>
          <div class="label">密码</div>
          <input type="text" class="password"/>
          <a class="goToLogin" @click="opt.isLoginType = true">登录</a>
          <button class="btn login-btn" @click="testa">注册</button>
        </div>
      </transition>
    </div>
    
  </div>
</template>

<script>
import Unit from '../js/unit-class'
import MAP_TABLE from '../data/map-data'

import MONSTER_DATA from '../data/monster-data';
import SKILL_TABLE from "../data/skill-data";
import STATE_TABLE from "../data/state-data";
import {ITEM_TABLE} from '../data/item-data';
import PGET from '../js/public-static-get';

let test1 = PGET(3000001);
test1.num = 10;
let test2 = PGET(3000002);
test2.num = 5;

var hero = new Unit(
  {
    $showName : 'Bastarder',
    $type    : 'Hero',
    $skills  : [_.cloneDeep(SKILL_TABLE[0]),_.cloneDeep(SKILL_TABLE[1]),_.cloneDeep(SKILL_TABLE[2]),_.cloneDeep(SKILL_TABLE[3])],
    $status  : [],
    $package : _.cloneDeep(ITEM_TABLE).slice(2).concat([test1,test2]).concat(new Array(26))
  }
);


export default {
  data(){
    return {
      opt:{
        isLoginType : true,
      },
      test : 22,
      test2 : false,
    }
  },
  methods:{
    testa(){
      console.log(123);
      this.$store.state.HeroStore.hero = hero;
      this.$router.push('/');
    }
  }
}
</script>

<style lang="less">
  .game-login{
    background: #252830;
    height: 100%;
    padding: 40px;
    .login,.register{
      position: absolute;
    }
    .left{
      display: inline-block;
      height: 100%;
      border: 1px solid #434857;
      vertical-align: top;
      width: 350px;
      margin-right: 10px;
      border-radius: 4px;
      padding: 30px 20px 10px 0px;
      color: white;
      li{
        padding: 8px 0px;
      }
    }
    .right{
      position: relative;
      overflow: hidden;
      display: inline-block;
      height: 100%;
      width: 350px;
      border: 1px solid #434857;
      vertical-align: top;
      border-radius: 4px;
      padding: 30px;
      a{
        color: white;
        cursor: pointer;
      }
      .title{
        color: white;
        font-size: 30px;
        margin-bottom: 20px;
      }
      input{
        border-radius: 2px;
        background: #434857;
        outline: none;
        border: 1px solid #252830;
        font-size: 20px;
        padding: 6px 8px;
        transition: all 0.3s;
        width : 100%;
        margin-bottom: 10px;
        font-weight: 200;
      }
      input:focus{
        background: white;
        border-color: white;
        transition: all 0.3s;
      }
      .login-btn{
        display : block;
        width : 100%;
        height: 38px;
        font-size: 20px;
        margin-top: 20px;
      }
      .label{
        color: white;
        margin-bottom: 4px;
      }
    }

  }
</style>
