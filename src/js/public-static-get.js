import { DIALOG_DATA } from './event-data'
import { EXP_TABLE } from './hero-data'
import { ITEM_TABLE } from './item-data'
import MAP_TABLE from './map-data'
import SKILL_TABLE from './skill-data'
import STATE_TABLE from './skill-data'

const Data = {
  '7' : DIALOG_DATA,   // '7'
  '0' : EXP_TABLE,
  '3' : ITEM_TABLE,    // '3'
  '8' : MAP_TABLE,     // '8'
  '1' : SKILL_TABLE,   // '1'
  '2' :STATE_TABLE,    // '2'
}

const PublicStaticGet = function(key){
  let Head = key.toString()[0];
  let record = Data[Head];
  return _.cloneDeep(_.find(record, {
    id: key
  }));
}