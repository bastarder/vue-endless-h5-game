const ITEM_TYPE = {
  
}

let Material = [
  {
    id: 3000001,
    name: '野草',
    pile : true,
    label : [
      '材料'
    ],
    dsc : '很常见的东西,或许能用来做一些东西'
  },
  {
    id: 3000002,
    name: '浆果',
    pile : true,
    label : [
      '食物','材料'
    ],
    use : [
      '[$hp]{10}',
    ],
    dsc : '能卖钱,能吃,数量很多'
  },
];

let Equipment = [
  {
    id: 3000003,
    name: '铁剑',
    equipType : 0,
    label: [
      '武器'
    ],
    equip : {
      $atk: 50,
      $skills : [1000001],
      $status : [2000001],
      $maxHp : "+0.1",
    },
    dsc : '最基础的武器.'
  },
  {
    id: 3000004,
    name: '破旧的护肩',
    equipType : 1,
    label: [
      '护肩'
    ],
    equip : {
      $def: 2,
      $atk: 5,
      $skills : [1000001],
      $status : [2000001],
      $maxHp : "+0.2",
      $maxMp : "+0.2",
    },
    dsc : '最基础的武器.'
  },
]

const ITEM_TABLE = _.concat(Material,Equipment);

export {
  ITEM_TABLE
};