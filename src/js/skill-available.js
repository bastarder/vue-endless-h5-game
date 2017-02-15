import store from '../store';

const SkillAvailable = function(skill, attacker, enemy){

  /**
   * 全局条件  
   */

  // 冷却;
  if(skill.coolTime > 0){
    store.commit('FightEventLogPush',`技能冷却中!`);
    return false;
  }

  // 人物状态,是否可行动 等等 暂留;

  /**
   * 附加条件  
   */

  if(!skill.restrict){
    return true;
  }

  let _length = _.filter(skill.restrict, function(rule){
    
    // 如果是高级规则,则直接判断返回值;
    if(typeof rule === "function"){
      return rule(skill, attacker, enemy);
    }

    // 简易规则,计算结果;
    let _rule = rule.replace(/\s/g,'').match(/^\[([\w$]+)\]\{([\w$]+)\}([\w\W]+)\{([\w\W]+)\}/);

    if(!_rule){
      return false;
    }

    let [ , type, key, condition, targetValue] = _rule;

    var originObject = '';

    // 判断对象;
    switch(type){
      case 'attacker':
        originObject = attacker;
        break;
      case 'skill' :
        originObject = skill;
        break;
      case 'enemy':
        originObject = enemy;
        break;
    }

    originObject = originObject[key];

    switch(condition){
      case 'has':
        targetValue = targetValue.split(',');
        for(let i = 0; i<targetValue.length; i++){
          if(_.findIndex(originObject,{ id: parseInt(targetValue[i])}) === -1){
            return false;
          }
        }
        return true;
      case 'nothas':
        targetValue = targetValue.split(',');
        for(let i = 0; i<targetValue.length; i++){
          if(_.findIndex(originObject,{ id: parseInt(targetValue[i])}) !== -1){
            return false;
          }
        }
        return true;
      case '>' : 
        return originObject > parseInt(targetValue);
      case '<' :
        return originObject < parseInt(targetValue);
      case '>=' : 
        return originObject >= parseInt(targetValue);
      case '<=' :
        return originObject <= parseInt(targetValue);
    }
    //   "[attacker]{$mp} > {100}",
    //   "[attacker]{$hp} < {300}",
    //   "[skill]{coolTime} > {0}",
    //   "[attacker]{$skills} has {}",
    //   "[attacker]{$status} nothas {}",
  }).length;

  return skill.restrict.length === _length;
}

export default SkillAvailable;