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
    mouseenter :  function(e){

      event.mouseleave();

      let tip = document.createElement('div');
      
      let {right, top} = e.target.getBoundingClientRect();

      Object.assign(tip.style, {
        position : 'absolute',
        left : `${right}px`,
        top : `${top}px`
      })

      Object.assign(tip, {
        className : tipClassName.slice(1),
        innerHTML : `
          <div class="name m-b-10 font-min" :style="itemColor">
            {{this.item.name}}
            <span v-if="item.intensify" class="color-yellow"> + {{item.intensify}}</span>
          </div>
          <div class="equip m-b-10">
            <div v-for="v in this.attr" class="m-b-4">
              <span :class="['attr-name', v[3], v[2] ? 'down' : '']">{{v[0]}}</span>
              <span :class="['attr-data', v[3], v[2] ? 'down' : '']">{{v[1]}}</span>
            </div>
          </div>
          <div class="intPowerUp color-purple m-b-10" v-if="item.intPowerUp">
            <span v-if="item.intPowerUp.$atk">强化攻击力 + {{item.intPowerUp.$atk}}</span>
            <span v-if="item.intPowerUp.$dmgDown">无视伤害 + {{item.intPowerUp.$dmgDown[0] * 100 + '%'}}</span>
          </div>
          <div class="dsc">{{item.dsc}}</div>
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
              return ['附加' + keyName[k], _.map(v, id => Vue.filter('itemKey')(id, 'name')).join(','), false, k.slice(1)];
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
    mouseleave : function(){
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
