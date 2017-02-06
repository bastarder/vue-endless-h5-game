<template>
  <div style="display: inline-block">
    <div class="state-item mini" v-if="mini">
      {{state.name.slice(0,1)}}
    </div>
    <div class="state-item" v-else>
      {{state.name.slice(0,1)}}
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'state',
    'mini'
  ]
}
</script>

<style scoped lang="less">
  .state-item{
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    background: red;
    color: white;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }
  .state-item.mini{
    width: 18px;
    height: 18px;
    line-height: 18px;
  }
</style>