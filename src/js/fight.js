import coolTimeEvent from './cool-time-event'

const Fight = (attacker, enemy, skill) => {
  
  let _status = _.filter(attacker.$status, { type: '1' });

  var _events = _.sortBy(
      _status.concat(skill), [ skill => 0 - skill.weight ]
    );
  
  var _events_be = _.sortBy(
      _.filter(enemy.$status, { type: '2' })
    );
    
  // 初始化效果对象
  var actionClass = function(){};

  actionClass.prototype.change = function(key, value, cover) {
    if(this[key]){
      if(cover){
        this[key] = value;
      }else{
        if(this[key] instanceof Array){
          this[key] = this[key].concat(value);
        }else{
          this[key] += value;
        }
      }
    }else{
      this[key] = value;
    }
  }

  var action = new actionClass();

  // 处理 主动效果;
  for(let i = 0 ; i < _events.length ; i++){
    if(!_events[i].event){
      continue;
    };
    _events[i].event.apply(attacker, [action, attacker, enemy]);
  }

  // 处理对方 被动效果;
  for(let i = 0 ; i < _events_be.length ; i++){
    if(!_events_be[i].event){
      continue;
    };
    _events_be[i].event.apply(enemy, [action, attacker, enemy]);
  }

  var actionList = {
    attacker:{},
    enemy:{}
  };
  
  for(var item in action){
    item = item.match(/^([\w]+)_([\w]+)$/);
    if(item){
      actionList[item[1]][item[2]] = action[item[0]];
    }
  }

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

  _.each(attacker.$skills, skill => {
    if(skill.coolTime < 300){
      skill.coolTime = 1000
      coolTimeEvent.call(skill, 1000)
    }
  })

  return attacker.$alive && enemy.$alive;

}

export default Fight;