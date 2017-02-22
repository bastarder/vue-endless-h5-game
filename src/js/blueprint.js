import store from '../store'
import PGET from '../js/public-static-get';

const BluePrint = function(opt){
  let hero = store.state.HeroStore.hero;
  let result = {
    success : false,
    msg : ''
  }

  if(!hero.isEnoughInPackage(opt.need)){
    return Object.assign(result, {
      success: false,
      msg : '材料不足!'
    })
  }

  let synthetics = opt.synthetics || [];

  synthetics = synthetics.map(v => {
    let item;
    if(({}).toString.call(v) === "[object Array]"){
      item = PGET(v[0]);
      console.log('array:',v[0]);
      v[1](item);
    }else{
      item = PGET(v)
    }
    return [item, item.num || 1];
  })

  if(hero.getItem(synthetics).length === 0){
    hero.getItem(synthetics, true);
    hero.costItem(opt.need);
  }else{
    return Object.assign(result, {
      success: false,
      msg : '背包不足!',
    })
  }

  return Object.assign(result, {
    success: true,
    msg : '锻造成功!',
    synthetics,
  })

}


export default BluePrint