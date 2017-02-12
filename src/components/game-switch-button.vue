<template>
  <div :class="['game-switch-button', this.value ? 'true' : 'false']" @click="change">
    <div class="button"></div>
  </div>
</template>

<script>
  export default {
    props: {
      value : {
        default : false
      },
    },
    methods: {
      change : function(){
        this.$emit('input', !this.value);
      }
    }
  }
</script>

<style scoped lang="less">

  .game-switch-button{
    display: inline-block;
    height: 20px;
    width: 40px;
    border-radius: 20px;
    border: 1px solid #e6e6e6;
    position: relative;

    .button{
      display: inline-block;
      width: 18px;
      height: 100%;
      border-radius: 18px;
      position: absolute;
      background: white;
      box-shadow: 0px 2px 2px rgba(0,0,0,.3);
      top: 0px;
      z-index: 5;
    }
  }

  .game-switch-button.true{
    border-color : #53d769;
    background : #53d769;
    .button{
      left: 20px;
      animation: changeTrue 0.3s;
    }
  }

  .game-switch-button.false{
    background: white;
    .button{
      left: 0px;
      animation : changeFalse 0.3s;
    }
  }

  @keyframes changeTrue
  {
    from {
      width:18px;
      left:0px;
    }
    40%,60% {
      width:22px;
      left:0px;
    }
    to {
      width: 18px;
      left:20px;
    }
  }

  @keyframes changeFalse
  {
    from {
      width:18px;
      left:20px;
    }
    40%,60% {
      width:22px;
      left:20px;
    }
    to {
      width: 18px;
      left:0px;
    }
  }

</style>