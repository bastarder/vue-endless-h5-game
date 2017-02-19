const BLUEPRINT_TABLE = [
  {
    id : 4000001,
    need : [
      [3000001, 2],
      [3000002, 1],
      [
        function(item){
          return item.id = 3000001;
        }, 
        function(){ 
          return 5; 
        }
      ]
    ],
    synthetics : [
      3000003,
      [
        3000004, 
        function(item){
          return item
        }
      ]
    ]
  }
]

export default BLUEPRINT_TABLE;