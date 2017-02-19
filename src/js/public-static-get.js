import { DIALOG_DATA } from '../data/event-data'
import { EXP_TABLE } from '../data/hero-data'
import { ITEM_TABLE } from '../data/item-data'
import MAP_TABLE from '../data/map-data'
import SKILL_TABLE from '../data/skill-data'
import STATE_TABLE from '../data/state-data'
import MONSTER_DATA from '../data/monster-data'
import BLUEPRINT_TABLE from '../data/blueprint-data'

const Data = {  
  '0' : EXP_TABLE,
  '1' : SKILL_TABLE,  
  '2' : STATE_TABLE,    
  '3' : ITEM_TABLE,  
  '4' : BLUEPRINT_TABLE,  
  '5' : MONSTER_DATA, 
  // '6' : MISSION_TABLE, 
  '7' : DIALOG_DATA, 
  '8' : MAP_TABLE,     
  // '9' : ACHIEVEMENT_TABLE, 
}

const PublicStaticGet = function(key){
  let Head = key.toString()[0];
  let record = Data[Head];
  let result = _.cloneDeep(_.find(record, {
    id: key
  })) || key;

  if(result.defaultTime){
    result.coolTime = 0;
    result.currentCoolTime = result.defaultTime;
  }

  return result;
}

export default PublicStaticGet;