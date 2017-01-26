import Vue from 'vue'
import CONSTANT from '../data/constant'
import PGET from '../js/public-static-get'
import store from '../store';

Vue.directive('drop-item',{
  update: init,
  bind: init,
  unbind: unbind
})

function unbind(el){
  let $el = $(el);
  $el.removeAttr('draggable');
  $el.off('dragstart');
  $el.off('dragend');
  $el.off('dragover');
  $el.off('drop');
}

function init(el, binding){

  let { hero, position } = binding.value,
      $el = $(el);
  
  unbind(el);

  ts(position, hero).item && $el.prop('draggable','true');
  
  $el.on('dragstart', function(event){
    event.originalEvent.dataTransfer.setData("item-drop-data", position);
    event.originalEvent.dataTransfer.setDragImage(event.target, 20, 20);
    $('.item-tool-tip-pover').remove();
  })

  $el.on('dragend', function(event){
    event.originalEvent.dataTransfer.clearData("item-drop-data");
    return false;
  })

  $el.on('dragover', function(event){
    event.preventDefault();
    return true;
  })

  $el.on('drop', function(event){
    event.preventDefault();

    let from = ts(event.originalEvent.dataTransfer.getData("item-drop-data"), hero),
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

  })

}

function ts(str, hero){
  let position = str.split('|');
  return {
    position : position[0],
    index : Number(position[1]),
    item : hero[position[0]] && hero[position[0]][position[1]]
  }
}
