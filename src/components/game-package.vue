<template>
  <div class="game-package shadow-box">
    <span>
      金币:{{this.hero.$resource.gold}}
      宝石:{{this.hero.$resource.gem}}
    </span>
    <div class="list">
      <template v-for="(item, index) in hero.$package" >
        <component-item :item="item" :position-index="'$package|' + index">
          <span class="item-name" slot="item-name">{{item ? item.name : ''}}</span>
          <span class="badge" slot="badge">{{item ? item.num : ''}}</span>
        </component-item>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      hero: {},
      info: {}
    }
  },
  created() {
    // 实例创建完毕, 获取战斗信息;
    this.hero = this.$store.state.hero;
    this.info = this.hero.$package[0];
  },
  watch: {
      hero : {
        handler: function(item){
          this.$forceUpdate();
        },
        deep: true
      }
  },
  methods :{
    // @drop="drop" 
    // @dragover="dragover"
    //     @dragstart="dragstart"
    //     @dragenter="dragenter"
    //     @dragleave="dragleave"
    //     @dragend="dragend"
    dragstart (event, index){
      event.dataTransfer.setData("Text",index);
      console.log('Start:',event);
    },
    drop (event, index){
      var up = event.dataTransfer.getData("Text")
      console.log('进行放置:',up,'=>',index)
      var x = this.hero.$package[up];
      this.hero.$package[up] = this.hero.$package[index];
      this.hero.$package[index] = x;
    },
    setInfo (item){
      this.info = item;
      this.$store.state.NOTICE_ITEM && this.$store.state.NOTICE_ITEM.remove();
      this.$store.state.NOTICE_ITEM = new PNotify({
          title: item.name,
          addclass: "notice-item",
          shadow: false,
          stack : {
              "dir1": "down",
              "dir2": "left",
              "context": $("#router-view")
          },
          text: `<div class="info">
                  <div>
                    <span class="label">
                      
                    </span>
                  </div>
                  <div class="dsc">
                    ${item.dsc}
                  </div>
                </div>`
      });
    },
    removeInfo (){
      
    },
    test (){
      
    }
  },
  computed : {

  },
}
</script>

<style>
 .game-package{
   text-shadow: 1px 1px 1px #cabfbf;
   display: inline-block;
   width: 344px;
   background-color: white;
   height: 440px;
   margin-top: 4px;
   padding: 4px;
 }
 .game-package .list{
   height: 260px;
   background: white;
   overflow: scroll;
 }


</style>
