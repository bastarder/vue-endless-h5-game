const MONSTER = 'Monster';

const MONSTER_DATA = [
  { 
    $level : 1,  
    $type : MONSTER,
    $showName : '小野猪',
    id : 5000001,
    $maxHp : 100,
    $maxMp : 0,
    $atk : 40,     
    $def : 0,   
    $status : [2000002, 2000004],
    $dropList : [
      // 物品ID, 数量范围, 几率
      [3000001, [1,3], 1],
      [3000002, [1,3], 0.5],
      [3000003, 1, 1],
      ['gold',[1, 2], 1],
      ['exp', 1, 1],
      ['gem',1, 1]
    ]
  },
  {
    $level : 2,  
    $type : MONSTER,
    $showName : '小牛',
    id : 5000002,
    $maxHp : 150,
    $maxMp : 0,
    $atk : 5,     
    $def : 0,   
    $status : [2000002],
    // $status : [2000002],
    // $skills : [1000001]
    $dropList : [

      [3000001, [1,3], 1],
      [3000002, [1,3], 0.5],
      [3000003, 1, 0.1],
      ['gold',[5, 10], 1],
      ['exp', 5, 1],
    ]
  }
]

export default MONSTER_DATA;