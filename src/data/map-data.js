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
      "7000001" : 10,
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
];


export default MAP_TABLE;