const initEvent = function(data, opt){
  opt.events = data;
  return opt;
}

const MAP_TABLE = [
  {
    id: 8000001,
    name: '村庄',
    logo: '',
    dsc: '一个几乎毫无危险的地方.',
    mapInitOption: {
      row : 10,
      col : 10,
      lines : 2,    // 分支量;
      inflex : 0.5  // 曲折度;
    },
    eventList: [

    ],    // 特殊事件触发点;
    rule: [          // 生成规则;

    ]
    
  },
  {
    id: 8000002,
    name: '森林',
    logo: '',
    dsc: '这里可能有野兽出没...',
    eventList: [],    
    monsterList: [],  
    itemList: [       

    ],
    rule: [         

    ]
    
  },
];


export default MAP_TABLE;