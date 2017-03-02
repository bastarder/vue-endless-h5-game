const ITEM_TYPE = {
  
}

let Material = [
  {
    id: 3000001,
    name: '野草',
    pile : true,
    price : 10,
    use : {
      defaultTime : 1000,
      restrict :[
        function(){
          return this.$hp > 500;
        }
      ],
      effect :[
        function(){
          this.changeHp(30);
        }
      ]
    },
    label : [
      '材料'
    ],
    dsc : '很常见的东西,或许能用来做一些东西'
  },
  {
    id: 3000002,
    name: '浆果',
    pile : true,
    use : function(){
      return {
        defautTime : 1000,
        restrict : [],
        effect :[]
      }
    },
    label : [
      '食物','材料'
    ],
    dsc : '能卖钱,能吃,数量很多'
  },
];

let Equipment = [
  {
    id: 3000003,
    level: 1,
    name: '铁剑',
    equipType : 0,
    label: [
      '武器'
    ],
    equip : {
      $atk: 5,
      $coolTimePer: 50,
      $skills : [1000004],
      $status : [2000001],
      $maxHp : [-10,1],
    },
    dsc : '最基础的武器.'
  },
  {
    id: 3000004,
    name: '破旧的护肩',
    level: 1,
    equipType : 1,
    label: [
      '护肩'
    ],
    equip : {
      $def: 2,
      $atk: 5,
      $skills : [1000002],
      $maxHp : 5,
      $maxMp : 5,
    },
    dsc : '用破布做成的护肩,只能挡风'
  },
  {
    id: 3000005,
    name: '破旧的马靴',
    level: 1,
    equipType : 2,
    label: [
      '鞋子'
    ],
    equip : {
      $def: 2,
      $atk: 1,
      $maxHp : 5,
      $maxMp : 5
    },
    dsc : '像是垃圾堆捡来的'
  },
  {
    id: 3000006,
    name: '破旧的腰带',
    level: 1,
    equipType : 3,
    label: [
      '腰带'
    ],
    equip : {
      $def: 2,
      $maxHp : 5,
      $maxMp : 5,
    },
    dsc : '随处可见的腰带'
  },
  {
    id: 3000007,
    name: '破旧的上衣',
    level: 1,
    equipType : 4,
    label: [
      '上衣'
    ],
    equip : {
      $def: 2,
      $maxHp : 5,
      $maxMp : 5,
    },
    dsc : '用破布做成的上衣,只能挡风'
  },
  {
    id: 3000008,
    name: '破旧的绑腿',
    level: 1,
    equipType : 5,
    label: [
      '绑腿'
    ],
    equip : {
      $def: 2,
      $maxHp : 5,
      $maxMp : 5,
    },
    dsc : '用破布做成的护肩,只能挡风'
  },
  {
    id: 3000009,
    name: '草戒',
    level: 1,
    equipType : 6,
    label: [
      '戒指'
    ],
    equip : {
      $def: 2,
      $atk: 5,
      $maxHp : 5,
      $maxMp : 5,
    },
    dsc : '用野草编制的戒指'
  },
  {
    id: 30000010,
    name: '石头挂坠',
    equipType : 7,
    level: 1,
    label: [
      '项链'
    ],
    equip : {
      $def: 2,
      $atk: 5,
      $maxHp : 5,
      $maxMp : 5,
    },
    dsc : '或许这也是一种信仰吧!'
  },
  {
    id: 30000011,
    name: '野草手镯',
    equipType : 8,
    level: 1,
    label: [
      '手镯'
    ],
    equip : {
      $def: 2,
      $atk: 5,
      $maxHp : 5,
      $maxMp : 5,
    },
    dsc : '用野草编制的手镯'
  },
  {
    id: 30000012,
    name: '精致的铁剑',
    level: 1,
    grade: 1,
    equipType : 0,
    label: [
      '武器'
    ],
    equip : {
      $def: 2,
      $atk: 15,
      $maxHp : 5,
      $maxMp : 5,
    },
    dsc : '用野草编制的手镯'
  },
  {
    id: 30000013,
    name: '无尽之刃',
    grade: 4,
    level: 20,
    equipType : 0,
    label: [
      '武器'
    ],
    equip : {
      $con: 100,
      $atk: 70,
      $critical  : 20,
      $status : [2000003],
    },
    dsc : '流传在世间,创世神的武器'
  },
  {
    id: 30000014,
    name: '反伤护甲',
    grade: 3,
    level: 20,
    equipType : 4,
    label: [
      '上衣'
    ],
    equip : {
      $def: 25,
      $maxHp : 100,
      $maxMp : 25,
      $status : [2000004, 2000002],
    },
    dsc : '哇!这么刺怎么穿上去的!'
  },
]

const ITEM_TABLE = _.concat(Material,Equipment);

export {
  ITEM_TABLE
};