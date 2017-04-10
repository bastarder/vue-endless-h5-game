import store from '../store';
import { GetRange, GetRandom } from './public-random-range';
import GameAudio from './audio'

let audio = function(){
  let data = {
    // success : require('static/audio/intensify-success.ogg'),
    // fail    : require('static/audio/intensify-fail.ogg'),
    // zero    : require('static/audio/intensify-zero.ogg'),
    // broken  : require('static/audio/intensify-broken.ogg')
  }
  return function(key){
    new GameAudio({
      src : data[key]
    });
  }
}();

const excuteSuccess = {
  type : function(){
    if(!this.equip){
      return {
        success: false,
        msg : '此物品无法被强化!'
      };
    }
  },
  good : function(hero){
    let grade = [1, 1.1, 1.2, 1.5, 2], // 品级系数;
        base = 100,
    // 计算花费
    cost = (() => {
      let g = grade[this.grade || 0];
      let l = (this.level || 1) * base;
      let i = this.intensify || 0;
      return (l + l * i) * g;
    })();
    if(!hero.cost(cost)){
      return {
        success: false,
        msg: '金币不足!'
      }
    }
  },
}

const isSuccess = function(item){
  let probability = [1, 1, 1, 0.95, 0.9, 0.8, 0.75, 0.62, 0.54, 0.41, 0.33, 0.28, 0.2, 0.17, 0.13, 0.1, 0.04, 0.03, 0.01, 0.01]
  let intensify = item.intensify || 0;
  return GetRandom(probability[intensify]);
}

const failureHandle = function(item){
  let intensify = item.intensify || 0;
  if(intensify < 3){
    // noop
    audio('fail');
  }else if(intensify < 8){
    // 退级 1-3之间;
    audio('fail');
    intensify -= GetRange([1,2]);
    item.intensify = Math.min(intensify, 3);
  }else if(intensify < 10){
    item.intensify = 0;
    audio('zero');
  }else{
    // 摧毁
    audio('broken');
    store.commit('ChangeIntensifyItem', null);
  }
  return item;
}

const excutePowerUp = function(item){
  let excute = {
    weapon : function(item){
      // 强化(武器)
      // '白','绿','蓝','紫','橙装'
      let coeffA = [8, 8, 10, 11, 12, 13][item.grade || 0];
      let coeffB = [0.4, 0.7, 1, 1.25, 1.4][item.grade || 0];
      let coefficient = [1, 2, 3, 4, 6, 8, 10, 12, 14, 17, 33, 50, 67, 108, 150, 192, 267, 360, 417, 500][item.intensify - 1];
      let positionCoeff = [1, 1, 1, 1, 1, 1, 1, 1, 1][item.equipType];
      let level = item.level || 1;
      item.intPowerUp = {
        $atk : Math.floor([level + coeffA/ 8 ] * coefficient * coeffB * positionCoeff)
      }
      // 伤害计算公式: [level + coeffA/ 8 ] * coefficient * coeffB * positionCoeff
    },
    armor : function(item){
      // 强化(防具)
      let coeffA = [1, 1.75, 2.5, 3.25, 3.75][item.grade || 0];
      let coefficient = [1, 2, 3, 5, 7, 9, 12, 14, 16, 20, 40, 60, 80, 130, 180, 230, 320, 410, 500][item.intensify - 1]
      let positionCoeff = [1, 1, 1, 1, 1, 1, 1, 1, 1][item.equipType];
      let base = 0.04 / 100;
      item.intPowerUp = {
        $dmgDown : [+(base * coefficient * coeffA * positionCoeff).toFixed(2), 1]
      }
    }
  };
  return item.equipType === 0 ? excute.weapon(item) : excute.armor(item);
}

const Intensify = function(item){

  let result = {
    success: true,
    msg : '',
  }

  // 计算是否符合强化要求;
  let validate = {
    type : [],
    good : [store.state.HeroStore.hero],
  };

  for(let key in validate){
    let re = excuteSuccess[key].apply(item, validate[key]);
    if(re){
      audio('fail');
      return re;
    }
  }

  // 计算是否强化成功
  if(!isSuccess(item)){
    failureHandle(item);
    Object.assign(result, {
      success: false,
      msg : "强化失败!"
    })
  }else{
    audio('success');
    item.intensify ? (item.intensify++) : (item.intensify = 1);
    Object.assign(result, {
      success: true,
      msg : "强化成功!"
    })
  }

  // 重新计算强化数据
  excutePowerUp(item);

  return result;
}







export default Intensify;