import Vue from 'vue'
import CONSTANT from '../data/constant'
import PGET from '../js/public-static-get'
import store from '../store';

Vue.directive('drop-item', function (el, binding){

  let { hero, position } = binding.value;
  
  let event = {
    dragend (event){
      event.dataTransfer.clearData("item-drop-data");
      return false;
    },
    dragover (event){
      event.preventDefault();
      return true;
    },
    dragstart (event){
      event.dataTransfer.setData("item-drop-data", position);
      event.dataTransfer.setDragImage(event.target, 20, 20);
      let itemPover = document.querySelector('.item-tool-tip-pover');
      itemPover && itemPover.parentNode.removeChild(itemPover);
    },
    drop (event){
      event.preventDefault();

      let from = ts(event.dataTransfer.getData("item-drop-data"), hero),
          to = ts(position, hero);   
      
      // 如果放置点跟 出发点相同 则不做操作;
      if(from.position === to.position && from.index === to.index){
        return ;
      }

      // 如果放置点是装备栏 那么必定为 装备;
      if(to.position === '$equipments'){
        // 如果装备部位不同 则取消操作;
        if(from.item.equipType === to.index){
          hero.equip(from.item, from.index, from.position);
        }
        return ;
      }

      // 如果出发点是装备栏 那么必定为卸载 或者装备;
      if(from.position === '$equipments'){
        if(to.item){
          if(to.item.equipType === from.index){
            hero.equip(to.item, to.index, to.position);
          }
          return ;
        }
      }

      // 叠加;
      if(from.item && to.item && (from.item.id === to.item.id) && from.item.pile && to.item.pile){
        hero[to.position][to.index].num += hero[from.position][from.index].num;
        hero[from.position][from.index] = 0;
        // 考虑到可能会加入物品切分功能 所以暂时不用下面的功能;
        // hero.getItem([[from.item.id,from.item.num]], true, to.position);
        store.commit('UPDATE');
        return ;
      }

      // 交换;
      let T = hero[from.position][from.index];
      hero[from.position][from.index] = hero[to.position][to.index];
      hero[to.position][to.index] = T;
      hero.updateAttribute();
      store.commit('UPDATE');
      console.info('[Move Item] From',from,'To',to);

    }
  }

  // 如果是格子是空的则禁用拖动;
  if(ts(position, hero).item){
    el.setAttribute('draggable','true');
  }else{
    el.removeAttribute('draggable');
  }

  // 创建事件,并销毁已销毁的事件;
  for(let key in event){
    let value = event[key],
        keyNameInElement = `${key}_EVENT_FUNCTION_ITEM_BLOCK`;
    el.removeEventListener(key, el[keyNameInElement]);
    el.addEventListener(key, value);
    el[keyNameInElement] = value;
  }

})

function ts(str, hero){
  let position = str.split('|');
  return {
    position : position[0],
    index : Number(position[1]),
    item : hero[position[0]] && hero[position[0]][position[1]]
  }
}
