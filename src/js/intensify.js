import store from '../store';

const intensify = function(item){
  let result = {
    success : true,
    item : null,
    msg : null,
  };

  if(!item || !item.equip){
    return Object.assign(result, {
      success: false,
      msg: '此物品无法被强化!'
    })
  }

  let hero = store.state.HeroStore.hero,
      grade = [1, 1.1, 1.2, 1.5, 2], // 品级系数;
      base = 100,
      // 计算花费
      cost = (() => {
        let g = grade[item.grade || 0];
        let l = (item.level || 1) * base;
        let i = item.intensify || 0;
        return (l + l * i) * g;
      })();
  
  if(!hero.cost(cost)){
    return Object.assign(result, {
      success: false,
      msg: '金币不足!'
    })
  }
  
  // 几率
  let probability = [1, 1, 1, 0.95, 0.9, 0.8, 0.75, 0.62, 0.54, 0.41, 0.33, 0.28, 0.2, 0.17, 0.13, 0.1, 0.04, 0.03, 0.01, 0.01]
  let level = item.level || 1;

  // 强化(武器)
  // 强化系数
            // '白','绿','蓝','紫','橙装'
  let coeffA = [8, 8, 10, 11, 12, 13];
  let coeffB = [0.4, 0.7, 1, 1.25, 1.4];
  let coefficient = [1, 2, 3, 4, 6, 8, 10, 12, 14, 17, 33, 50, 67, 108, 150, 192, 267, 360, 417, 500];
  let positionCoeff = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  // 伤害计算公式: [level + coeffA/ 8 ] * coefficient * coeffB * positionCoeff

  // 强化(防具)

  // 消耗




  item.intensify ? (item.intensify++) : (item.intensify = 1);

  return result;
}


export default intensify;