import coolTimeEvent from './cool-time-event'
import actionClass from './fight-action-class'

const Fight = (attacker, enemy, skill) => {

  // 开始;
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
      item.father = skill;
    })
    eventList = eventList.concat(skill.eventList || []);
  });

  // 排序;
  eventList = _.sortBy(eventList, ['weight']);

  // 初始化行动对象;
  var action = new actionClass();

  // 计算最终行动对象;
  _.each(eventList, item => {
    item.event.apply(item.father, [action, attacker, enemy]);
  })

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
      skill.coolTime = 1000
      coolTimeEvent.call(skill, 1000)
    }
  })

  // 返回是否存活; 目前无任何实际用途;
  return attacker.$alive && enemy.$alive;

}

export default Fight;