import { DIALOG_DATA } from '../data/event-data'
import { EXP_TABLE } from '../data/hero-data'
import { ITEM_TABLE } from '../data/item-data'
import MAP_TABLE from '../data/map-data'
import SKILL_TABLE from '../data/skill-data'
import STATE_TABLE from '../data/state-data'
import MONSTER_DATA from '../data/monster-data'

const Data = {
  '7' : DIALOG_DATA,   // '7'
  '0' : EXP_TABLE,
  '3' : ITEM_TABLE,    // '3'
  '8' : MAP_TABLE,     // '8'
  '1' : SKILL_TABLE,   // '1'
  '2' : STATE_TABLE,    // '2'
  '5' : MONSTER_DATA
}

const PublicStaticGet = function(key){
  let Head = key.toString()[0];
  let record = Data[Head];
  return _.cloneDeep(_.find(record, {
    id: key
  })) || key;
}

export default PublicStaticGet;