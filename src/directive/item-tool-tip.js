import Vue from 'vue'
import CONSTANT from '../data/constant'
import PGET from '../js/public-static-get'

require('../css/item-tool-tip.css');

export default function(el, binding){
  let keyName = CONSTANT.UNIT_ATTR_NAME,
      itemLevel = CONSTANT.ITEM_LEVEL,
      tipClassName = '.item-tool-tip-pover',
      item = binding.value;
      
  let event = {
    mousemove :  function(){

      event.mouseout();

      let tip = document.createElement('div');

      Object.assign(tip.style, {
        position : 'absolute',
        left : `${window.event.clientX + 30}px`,
        top : `${window.event.clientY + 30}px`
      })


      Object.assign(tip, {
        className : tipClassName.slice(1),
        innerHTML : `
          <div class="name m-b-10 font-min" :style="this.itemColor">{{this.item.name}}</div>
          <div class="equip m-b-10">
            <div v-for="v in this.attr" class="m-b-4">
              <span :class="['attr-name', v[3], v[2] ? 'down' : '']">{{v[0]}}</span>
              <span :class="['attr-data', v[3], v[2] ? 'down' : '']">{{v[1]}}</span>
            </div>
          </div>
          <div class="dsc">{{this.item.dsc}}</div>
        `
      })

      document.body.appendChild(tip);

      new Vue({
        created(){
          this.item = item;
          this.itemColor = {
            color : itemLevel[this.item.grade || 0]
          }
          this.attr = _.map(this.item.equip, (v,k) => {
            let record = {v}, i = v;
  
            if(k === '$status' || k === '$skills'){
              return ['附加' + keyName[k], _.map(v, id => PGET(id).name).join(','), false, k.slice(1)];
            }

            if(Object.prototype.toString.call(v) === '[object Array]' && v[1] === 1 || v[1] === 3){
              record.v = v[0] + '%';
              i = v[0];
            }

            if(i > 0){
              record.v = "+" + record.v;
            }else{
              record.down = true;
            }

            return [keyName[k], record.v, record.down, k.slice(1)];
          }).sort(v => {
            return (v[3] === 'status' || v[3] === 'skills') ? 1 : 0
          })
        }
      }).$mount(tipClassName);

    },
    mouseout : function(){
      let old = document.querySelector(tipClassName);
      // 移除已经存在的tip;
      if(old){
        old.parentNode.removeChild(old);
      }
    }
  }

  for(let key in event){

    let value = event[key],
        keyNameInElement = `${key}_EVENT_FUNCTION_ITEM_TOOL_TIP`;

    el.removeEventListener(key, el[keyNameInElement]);

    if(item){
      el.addEventListener(key, value);
      el[keyNameInElement] = value;
    }

  }

}
