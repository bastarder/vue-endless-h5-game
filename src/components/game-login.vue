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
          <button class="btn login-btn" @click="login">登录</button>
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
import {LoadGame} from "../js/save-load"

export default {
  data(){
    return {
      opt:{
        isLoginType : true,
      }
    }
  },
  created(){
    let isLogin = false;
    if(isLogin){
      LoadGame();
      this.$router.push('/');
    }
  },
  methods:{
    login(){
      let loginPromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true
          })
        }, 500);
      })

      loginPromise.then((data)=>{
        LoadGame();
        this.$router.push('/');
      })
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
