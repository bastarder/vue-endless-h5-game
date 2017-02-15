<template>
  <div class="game-hot-key-item" @mouseenter="setFocus">
    <div>
      {{String.fromCharCode(value)}}
    </div>
    <input ref="input" :value="value" @keydown="updateValue"/>
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
      setFocus : function(e){
        this.$refs.input.focus();
      },
      updateValue : function(e){
        this.$refs.input.value = "";
        let key = e.keyCode;

        if(key === 8 || key === 9){
          key = this.value;
        }

        this.$emit('input', key);
      }
    }
  }
</script>

<style scoped lang="less">

  .game-hot-key-item{
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    display: inline-block;
    border:1px solid #eee;
    border-radius: 4px;
    input{
      position: absolute;
      vertical-align: top;
      opacity:0;
      top: 0px;
      left: 0px;
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
  }

  .game-hot-key-item:hover{
    border:1px solid black;
  }

</style>