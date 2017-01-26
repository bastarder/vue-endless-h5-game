import Vue from 'vue'
import CONSTANT from '../data/constant'
import PGET from '../js/public-static-get'

Vue.directive('item-tool-tip',{
  update: initTip,
  bind: initTip,
  unbind: function($el, binding){
    $('.item-tool-tip-pover').remove();
    $($el).off('mousemove');
    $($el).off('mouseout');
  }
})

function initTip($el, binding){
    let keyName = CONSTANT.UNIT_ATTR_NAME;
    let itemLevel = CONSTANT.ITEM_LEVEL;
    var item = binding.value;
    $($el).off('mousemove');
    $($el).off('mouseout');

    if(!item){
      return ;
    }

    $($el).on('mousemove',show);
    $($el).on('mouseout',hide);

    function show(){
      $('.item-tool-tip-pover').remove();
      $('body').append(init());
    }

    function hide(){
      $('.item-tool-tip-pover').remove();
    }

    function init(){

      let nor = "",spe = "";
      _.each(item.equip, (v, k) => {
        if(k === '$skills' || k === '$status' ){
          let nameList = [];

          _.each(v, id => nameList.push(PGET(id).name));

          spe+= `<div>
                   <span class="attr-name ${k.slice(1)}">附加${keyName[k]}&nbsp;&nbsp;</span>
                   <span class="attr-data ${k.slice(1)}">${nameList.join(' ,')}</span>
                 </div>`
        }else{
          let sv = v;
          if(typeof sv === "string"){
            sv = Math.floor(Number(sv) * 100) + "%";
          }
          let isUp = (Number(v) >= 0);
          nor+= `<div>
                   <span class="attr-name ${isUp ? 'up' : 'down'}">${keyName[k]}&nbsp;&nbsp;</span>
                   <span class="attr-data ${isUp ? 'up' : 'down'}">${isUp ? '+ ' : ' '}${sv}</span>
                 </div>`;
        }
      })

      let equip = "";

      nor && (equip+=`<div class="nor">${nor}</div>`);

      spe && (equip+=`<div class="spe">${spe}</div>`);

      let el = `
        <div class="item-tool-tip-pover">
          <div class="name" style="color:${itemLevel[item.grade || 0]};">${item.name}</div>
          <div class="equip">
            ${equip}
          </div>
          <div class="dsc">${item.dsc}</div>
        </div>
      `;

      el = $(el);

      el.css({
        display: 'inline-block',
        position: 'absolute',
        left: (window.event.clientX + 30) + 'px',
        top: (window.event.clientY + 30) + 'px',
      })

      return el;
    }

  }
