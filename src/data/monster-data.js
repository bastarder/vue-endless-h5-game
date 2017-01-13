const MONSTER = 'Monster';

const MONSTER_DATA = [
  { 
    $level : 1,  
    $type : MONSTER,
    $showName : '小野猪',
    id : 5000001,
    $maxHp : 20,
    $maxMp : 0,
    $atk : 2,     
    $def : 0,   
    $status : [2000002],
    $skills : [1000001],
    $dropList : [
      // 物品ID, 数量范围, 几率
      [3000001, 1, 1],
      [3000002, 5, 0.3],
      [3000003, [3,10], 0.1],
    ]
  },
  {
    $level : 2,  
    $type : MONSTER,
    $showName : '小牛',
    id : 5000002,
    $maxHp : 50,
    $maxMp : 0,
    $atk : 5,     
    $def : 0,   
    $status : [2000002],
    $skills : [1000001],
    // $status : [2000002],
    // $skills : [1000001]
  }
]

export default MONSTER_DATA;