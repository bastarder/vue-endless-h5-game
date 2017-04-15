import Vue from 'vue'
import CONSTANT from '../data/constant'
import PGET from '../js/public-static-get'
import store from '../store';
import dragDrop from '../js/drag-drop';
import moveClass from '../js/different-item-move-class'

export default function (el, binding){

  let { hero, position } = binding.value;
  
  let event = {
    dragend (event){
      event.dataTransfer.clearData("text");
      return false;
    },
    dragover (event){
      event.preventDefault();
      return true;
    },
    dragstart (event){
      event.dataTransfer.setData("text", position);
      try {
        event.dataTransfer.setDragImage(!~event.target.className.indexOf("component-item") ? event.target.parentNode : event.target, 20, 20);
      } catch (error) {
        // pass
      }
      let itemPover = document.querySelector('.item-tool-tip-pover');
      itemPover && itemPover.parentNode.removeChild(itemPover);
    },
    drop (event){
      event.preventDefault();

      dragDrop(
        event.dataTransfer.getData("text"), 
        position, 
        hero
      );

      hero.updateAttribute();

      store.commit('UPDATE');

    }
  }

  // 如果是格子是空的则禁用拖动;
  {
    let block = new moveClass(position).get();

    if(block){
      el.setAttribute('draggable','true');
    }else{
      el.removeAttribute('draggable');
    }
    block = null;
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
