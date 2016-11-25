const ITEM_TYPE = {
  
}

let Material = [
  {
    id: 3000001,
    name: '野草',
    label : [
      '材料'
    ],
    dsc : '很常见的东西,或许能用来做一些东西'
  },
  {
    id: 3000002,
    name: '浆果',
    label : [
      '食物','材料'
    ],
    dsc : '能卖钱,能吃,数量很多'
  },
];

let Equipment = [
  {
    id: 4000001,
    name: '铁剑',
    label: [
      '武器'
    ],
    power : [
      '[$attr.atk]{50}',
      '[$skills]{1000001}',
      '[$status]{2000001}',
      '[$maxHp]{50}',
    ],
    dsc : '最基础的武器.'
  },
]

const ITEM_TABLE = _.concat(Material,Equipment);

export {
  ITEM_TABLE
};