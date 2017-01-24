import coolTimeEvent from './cool-time-event'
import actionClass from './fight-action-class'
import SkillAvailable from './skill-available'
import { GetRange, GetRandom } from './public-random-range';

const Fight = (attacker, enemy, skill) => {


  // 判断是否可以行动;
  if(!SkillAvailable(skill, attacker, enemy)){
    return ;
  }

  // 触发冷却;
  coolTimeEvent.call(skill);

  // 开始计算打击事件;
  let event = _.concat(
    _.filter(attacker.$status, { type: '1' }),
    _.filter(enemy.$status, { type: '2' }),
    [ skill ]
  );

  // 提取事件;
  var eventList = [];

  // 拼接父技能;
  _.each(event, skill => {
    _.each(skill.eventList, item => {
      eventList.push({
        father   : skill,
        eventStr : item,
        weight   : Number(item.match(/\[(\d+)\]/)[1])
      })
    })
  });

  // 排序;
  eventList = _.sortBy(eventList, ['weight']);

  // 初始化行动对象;
  var action = new actionClass(attacker, enemy);

  let opt = {
    attacker, enemy, action
  };

  // 插入规则中间缓冲
  eventList.push(
    // action 层
    {
      width: 10,
      father : skill,
      eventStr : function(action, attacker, enemy){
        action.state.isCritical = GetRandom(attacker.$r.$critical / 100);
        action.state.isMiss = GetRandom(enemy.$r.$dodge / 100);
      }
    },
    // CountFinal 层 , 需要最终伤害为基准的事件之前;
    {
      width: 90,
      father : skill,
      eventStr : function(action, attacker, enemy){
        action.CountFinal();
      }
    },
    // 最终层 , 永远在事件列队的最后;
    {
      width: 9999,
      father : skill,
      eventStr : function(action, attacker, enemy){
        action.init();
      }
    }
  )

  // 计算最终行动对象;
  _.each(eventList, item => {
    let father = item.father;
    var eventStr,ruleStr;
    if(typeof item.eventStr === 'function'){
      item.eventStr.apply(father, [action, attacker, enemy]);
      return;
    }
    var str = item.eventStr.replace(/[\r\n\s]/g,"").replace(/\[(\d+)\]/,"").split('#');
    if(str.length > 1){
      ruleStr = str[0];
      eventStr = str[1];
    }else{
      eventStr = str[0];
    }

    if(ruleStr){
      ruleStr = ruleStr.split(';');
      for(let i = 0; i<ruleStr.length; i++){
        let [,target, func] = ruleStr[i].match(/(\w+)@\{([^]+)\}/)
        if(!new Function(target,`return ${func};`)(opt[target])){
          return ;
        }
      }
    }

    let funcStr = "";
    _.each(eventStr.split(';'),(estr)=>{
      let e = estr.match(/(\w+)@(\w+)@([^]+)/);
      if(!e){
        e = estr.match(/action@\{([^]+)\}/);
        if(!e){
          console.warn('不能识别的技能效果码!', item);
          return 
        };
        funcStr += `${e[1]};`;
      }else{
        let [, target,func,parm] = e;
        funcStr += `action.change('${target + '_' + func}',${parm.replace('@',',')});`;
      }
    })

    new Function('action','attacker','enemy', funcStr ).apply(father, [action, attacker, enemy]);

    // item.event.apply(item.father, [action, attacker, enemy]);
  })

  // 判断闪避
  if(action.state.isMiss && !action.state.isMust){
    console.log('敌人闪避!');
    return ;
  }

  // 获取双方变更行动对象;
  var actionList = {
    attacker: {},
    enemy: {}
  };
  
  for(var item in action){
    item = item.match(/^([\w]+)_([\w]+)$/);
    if(item){
      actionList[item[1]][item[2]] = action[item[0]];
    }
  }

  // ======== 处理 ========

  // attacker
  for(var item in actionList.attacker){
    if(attacker[item]){
      attacker[item](actionList.attacker[item]);
    }else{
      console.warn('战斗中发现未知事件:' , item , actionList.attacker[item]);
    }
  }

  // enemy
  for(var item in actionList.enemy){
    if(attacker[item]){
      enemy[item] && enemy[item](actionList.enemy[item]);
    }else{
      console.warn('战斗中发现未知事件:' , item , actionList.enemy[item]);
    }
  }

  // 全局冷却 1秒;
  _.each(attacker.$skills, skill => {
    if(skill.coolTime < 300){
      coolTimeEvent.call(skill, 1000)
    }
  })

  // 返回是否存活; 目前无任何实际用途;
  return attacker.$alive && enemy.$alive;

}

export default Fight;