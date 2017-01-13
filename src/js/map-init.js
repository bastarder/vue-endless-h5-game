import DungeonCreater from '../js/dungeon-creater';
import CONSTANT from '../data/constant';
import PGET from '../js/public-static-get';

const Map = function(o){
  let blockType = CONSTANT.MAP_BLOCK_TYPE;
  let opt = _.cloneDeep(o);

  // 生成基础地图;
  this.$data = opt.mapData || new DungeonCreater(opt.mapInitOption || {});
  let mapData = this.$data.mapData;
  
  // 生成起点,英雄初始位置;
  this.hero = getBlankRandomBlock(mapData, blockType)[0];

  this.hero.block_type = blockType['HERO']
  
  // 生成怪物点;
  _.each(opt.monsterList, id => {
    let item = PGET(id);
    let len = opt.rule[String(id)];
    _.each(getBlankRandomBlock(mapData, blockType, len), block => {
      block.FEvent = item;
    })
  })

  // 生成事件;
  _.each(opt.eventList, id => {
    let item = PGET(id);
    let len = opt.rule[String(id)];
    _.each(getBlankRandomBlock(mapData, blockType, len), block => {
      block.DEvent = item
    })
  })

  // monsterList: [
  //   5000001, 5000002
  // ],
  // eventList: [
  //   7000001
  // ],    // 特殊事件触发点;
  // rule: {          // 生成规则;
  //   "5000001" : 4,
  //   "5000003" : 5,
  //   "7000001" : 1,
  // }
  
}

function getBlankRandomBlock(mapData, blockType, size){
  return _.sampleSize(
    _.filter( _.flattenDeep(mapData), item => {
      if (item.block_type != blockType['ROAD'] || item.FEvent || item.DEvent){
        return false;
      }
      return true;
    }),
    size
  );
}

export default Map;
