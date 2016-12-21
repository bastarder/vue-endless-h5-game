import DungeonCreater from '../js/dungeon-creater';
import CONSTANT from '../data/constant';

const Map = function(opt){
  let blockType = CONSTANT.MAP_BLOCK_TYPE;

  // 生成基础地图;
  this.$data = opt.mapData || new DungeonCreater(opt.mapInitOption || {});
  let mapData = this.$data.mapData;
  
  // 生成起点,英雄初始位置;
  this.hero = _.sample(
    _.filter(
      _.flattenDeep(mapData),
      { block_type: blockType['ROAD'] }
    )
  );

  this.hero.block_type = blockType['HERO']

  // 生成事件;
  
  



}

export default Map;
