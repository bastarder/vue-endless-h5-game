const MAP_TABLE = [
  {
    id: 8000001,
    name: '村庄',
    logo: '',
    dsc: '一个几乎毫无危险的地方.',
    mapInitOption: {
      row : 20,
      col : 20,
      lines : 10,    // 分支量;
      inflex : 0.5  // 曲折度;
    },
    monsterList: [
      5000001, 5000002
    ],
    eventList: [
      7000001
    ],    // 特殊事件触发点;
    rule: {          // 生成规则;
      "5000001" : 4,
      "5000002" : 5,
      "7000001" : 1,
    }
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
    rule: {

    }
    
  },
  {
    id: 8000003,
    name: '青木镇',
    logo: '',
    dsc: '繁华的小镇,却影藏着危机...',
    eventList: [],    
    monsterList: [],  
    itemList: [       

    ],
    rule: {

    }
    
  },
  {
    id: 8000004,
    name: '镇外',
    logo: '',
    dsc: '发狂的人类?...',
    eventList: [],    
    monsterList: [],  
    itemList: [       

    ],
    rule: {

    }
    
  },
  {
    id: 8000005,
    name: '青木林',
    logo: '',
    dsc: '发狂的人类?...',
    eventList: [],    
    monsterList: [],  
    itemList: [       

    ],
    rule: {

    }
    
  },
  {
    id: 8000006,
    name: '火焰洞穴',
    logo: '',
    dsc: '发狂的人类?...',
    eventList: [],    
    monsterList: [],  
    itemList: [       

    ],
    rule: {

    }
    
  },
  {
    id: 8000007,
    name: '冰霜洞穴',
    logo: '',
    dsc: '发狂的人类?...',
    eventList: [],    
    monsterList: [],  
    itemList: [       

    ],
    rule: {

    }
    
  },
  {
    id: 8000008,
    name: '祭祀台',
    logo: '',
    dsc: '发狂的人类?...',
    eventList: [],    
    monsterList: [],  
    itemList: [       

    ],
    rule: {

    }
    
  },
  {
    id: 8000009,
    name: '骷髅大厅',
    logo: '',
    dsc: '发狂的人类?...',
    eventList: [],    
    monsterList: [],  
    itemList: [       

    ],
    rule: {

    }
    
  },
  {
    id: 80000010,
    name: '骷髅王',
    logo: '',
    dsc: '发狂的人类?...',
    eventList: [],    
    monsterList: [],  
    itemList: [       

    ],
    rule: {

    }
    
  },
  {
    id: 80000011,
    name: '洞穴出口',
    logo: '',
    dsc: '发狂的人类?...',
    eventList: [],    
    monsterList: [],  
    itemList: [       

    ],
    rule: {

    }
    
  },
  {
    id: 80000012,
    name: '黑色小溪',
    logo: '',
    dsc: '发狂的人类?...',
    eventList: [],    
    monsterList: [],  
    itemList: [       

    ],
    rule: {

    }
    
  },
];


export default MAP_TABLE;