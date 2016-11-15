<template>
  <div class="game-package shadow-box">
    <div class="list">
      <div class="item">
        <div class="item-name">神剑</div>
        <div class="item-progress">
          <div class="progress">
            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 45%">
              <span class="sr-only">45% Complete</span>
            </div>
          </div>
        </div>
        <div class="badge">5</div>
      </div>
      <div class="item">
        <div class="item-name">血瓶</div>
        <div class="item-progress">
        </div>
        <div class="badge">5</div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
            <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="info">
      <div>
        <span class="label">武器</span>
        <span class="label">剑</span>
        <span class="label">神圣的</span>
        <span class="label">永恒的</span>
        <span class="label">创世者</span>
        <span class="label">神</span>
      </div>
      <div class="dsc">
        传说中开天辟地诞生的一把神器!
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: '123'
    }
  }
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
 .game-package .item{
   display: inline-block;
   vertical-align: top;
   text-align: center;
   width: 44px;
   height: 44px;
   border: 1px solid #eee;
   margin: 4px 4px;
   box-shadow: 1px 1px 6px #eee;
 }
 .game-package .item:hover{
   cursor: pointer;
   box-shadow: 1px 1px 6px gray;
   border: gray;
 }
 .game-package .item .item-progress,.game-package .item .progress{
   height: 5px;
   margin: 1px 3px;
 }
 
 .game-package .item .badge{
   vertical-align: top;
   padding: 1px 10px;
   font-size: 10px;
   margin-top: 2px;
 }
 .game-package .item .item-name{
   font-size: 10px;
   font-weight: 700;
   color: brown;
 }

 .game-package .info{
   margin-top: 10px;
   height: 160px;
   background: #eee;
   padding: 10px;
 }
 .game-package .info .dsc{
   margin-top: 10px;
   background: white;
   height: 110px;
   text-align: center;
   font-size: 75%;
   font-weight: 700;
   padding: 10px;
 }
 .game-package .info .label{
   background: white;
   color: black;
   border-radius: 0px;
   
 }
</style>
