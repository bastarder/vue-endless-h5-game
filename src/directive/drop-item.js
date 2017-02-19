import Vue from 'vue'
import CONSTANT from '../data/constant'
import PGET from '../js/public-static-get'
import store from '../store';

export default function (el, binding){

  let { hero, position } = binding.value;

  let moveClass = function(str){

    let opt = str.split('|')

    this.position = opt[0];

    this.index = Number(opt[1]);

    this.item = (() => {
      if(this.position === '$intensify'){
        return store.state.SmithyStore.intensifyItem;
      }else{
        return hero[this.position][this.index];
      }
    })();

    this.set = function(obj){
      if(this.position === '$intensify'){
        store.commit('ChangeIntensifyItem', obj);
      }else{
        hero[this.position][this.index] = obj;
      }
    }

    this.cls = function(){
      if(this.position === '$intensify'){
        store.commit('ChangeIntensifyItem', undefined);
      }else{
        hero[this.position][this.index] = undefined;
      }
    }

  }
  
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
      event.dataTransfer.setDragImage(!~event.target.className.indexOf("component-item") ? event.target.parentNode : event.target, 20, 20);
      let itemPover = document.querySelector('.item-tool-tip-pover');
      itemPover && itemPover.parentNode.removeChild(itemPover);
    },
    drop (event){
      event.preventDefault();

      let from = new moveClass(event.dataTransfer.getData("item-drop-data")),
          to = new moveClass(position);   
      
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
        to.item.num += from.item.num;
        from.cls();
        // 考虑到可能会加入物品切分功能 所以暂时不用下面的功能;
        // hero.getItem([[from.item.id,from.item.num]], true, to.position);
        store.commit('UPDATE');
        return ;
      }

      // 交换;
      let T = from.item;
      from.set(to.item);
      to.set(T);
      hero.updateAttribute();
      store.commit('UPDATE');
      console.info('[Move Item] From',from,'To',to);

    }
  }

  // 如果是格子是空的则禁用拖动;
  if(new moveClass(position).item){
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

};
