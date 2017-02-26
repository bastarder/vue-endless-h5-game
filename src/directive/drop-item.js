import Vue from 'vue'
import CONSTANT from '../data/constant'
import PGET from '../js/public-static-get'
import store from '../store';
import dragDrop from '../js/drag-drop';

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
        return hero && hero[this.position] && hero[this.position][this.index];
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

      dragDrop(
        new moveClass(event.dataTransfer.getData("item-drop-data")),
        new moveClass(position), 
        hero
      );

      hero.updateAttribute();

      store.commit('UPDATE');

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
