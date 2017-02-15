<template>
  <div class="game-slider" ref="main" @mousedown="moveStart">
    <div class="selected" ref="selected"></div><!--
    --><div class="slider" ref="slider"></div>
  </div>
</template>

<script>
  export default {
    props: {
      value : {
        default : 0
      },
      min : {
        default : 0,
        type: Number
      },
      max : {
        default : 100,
        type: Number
      }
    },
    created (){
      this.$nextTick(function(){
        let { main, slider, selected } = this.$refs;
        this.range = main.offsetWidth - slider.offsetWidth;
        this.setStyle(
          this.left = Math.floor(this.range * Math.min((this.value - this.min) / this.max, 1))
        );
      })
    },
    methods: {
      setStyle : function(left){
        let { slider, selected } = this.$refs;
        selected.style.width = `${left + 20}px`;
        slider.style.left = `${left}px`;
      },
      updateValue : function(){
        this.$emit('input', 
          Number((this.left / this.range * (this.max - this.min) + this.min).toFixed(1))
        );
      },
      setPosition : function(mouseUp){
        let left = Math.min(Math.max(this.left + this.currentPosition - this.startPosition, 0), this.range);
        this.setStyle(left);
        if(mouseUp){
          this.left = left;
          this.updateValue();
        }
      },
      moveStart : function(e){
        let {main,slider, selected} = this.$refs;
        if(e.target !== slider){
          this.left = Math.max(Math.min(e.offsetX, this.range),0);
          this.setStyle(this.left);
          this.updateValue();
        }
        this.startPosition = e.screenX;
        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
      },
      mouseMove : function(e){
        this.currentPosition = e.screenX;
        this.setPosition();
      },
      mouseUp : function(e){
        this.currentPosition = e.screenX;
        this.setPosition(true);
        document.removeEventListener('mousemove', this.mouseMove);
        document.removeEventListener('mouseup', this.mouseUp);
      }
      
    }
  }
</script>

<style scoped lang="less">

  .game-slider{
    display: inline-block;
    position: relative;
    width: 200px;
    height: 20px;
    background: #f5f5f5;
    cursor: pointer;
    border-radius : 20px;

    .slider{
      position: absolute;
      display: inline-block;
      width: 20px;
      height: 100%;
      border-radius: 50%;
      background: white;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      transition: left 0.1s;
    }

    .selected{
      display:inline-block;
      width : 0px;
      height : 100%;
      border-radius : 20px;
      background: #53d769;
      transition: width 0.1s;
    }
  }

</style>