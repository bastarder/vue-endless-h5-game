const DIALOG_DATA = [
  { 
    id : 7000001,
    data: [
      {
        msg: '你好, 我需要以下材料,给我,我就给你你想要的~:',
        // test : "[不给!]{1,}|"
        buttons: [
          {
            title: '不给!',
            action: function(){
              this.$i = 1;
              this.next();
              this.isEnd = true;
            }
          },
          {
            title: '我乐意提供',
            action: function(){
              this.$i = 2;
              this.next();
              this.isEnd = true;
            }
          }
        ],
        need : [{},{}],
        get  : [{},{}]
      },
      '没诚意滚蛋!',
      '合作愉快~'
    ]
  }
]

export {
  DIALOG_DATA
};