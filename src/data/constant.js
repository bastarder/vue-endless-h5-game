const CONSTANT = {
  MAP_BLOCK_TYPE:{
    STICK : '2',  // 障碍
    ROAD  : '0',  // 可行走
    PATH  : '4',  // 路径
    HERO  : '1',  // 英雄
    END   : '3'  // 寻路终点
  },
  UNIT_ATTR_NAME:{
    $hp          : '当前生命值',
    $mp          : '当前魔法值',
    $maxHp       : '生命最大值',
    $maxMp       : '魔法最大值',
    $atk         : '攻击力',
    $def         : '防御',
    $str         : '力量',
    $dex         : '敏捷',
    $con         : '体质',
    $int         : '智力',
    $critical    : '暴击',
    $dodge       : '闪避',
    $coolTimePer : '冷却缩短',
    $skills      : '技能',
    $status      : '状态',
  },
  ITEM_LEVEL: ['white','springgreen','skyblue','violet','orange']
}

export default CONSTANT