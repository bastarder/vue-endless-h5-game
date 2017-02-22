const BLUEPRINT_TABLE = [
  {
    id : 4000001,
    name : '测试蓝图',
    need : [
      [3000001, 22],
      [3000002, 1],
      [
        function(item){
          return item && item.id === 3000001;
        }, 
        function(){ 
          return 5; 
        },
        '未知的物品',
      ]
    ],
    synthetics : [
      3000003,
      [
        3000004, 
        function(){
          return item
        }
      ]
    ]
  },
  {
    id : 4000002,
    name : '狂战士之斧',
    need : [
      [3000001, 2],
      [3000002, 1],
    ],
    synthetics : [
      30000013,
    ]
  }
]

export default BLUEPRINT_TABLE;