import Unit from '../js/unit-class';

const MapEvent = {
  data: [],
  type: ''
}

const MapDialog = function(opt, $VueScope, moveEvent){
  _.assign(this,_.cloneDeep(MapEvent));

  this.type = 'MapDialog';
  this.$i = 0;
  this.$VueScope = $VueScope;
  this.$el = $('.modal');

  this.callAction = function(action){
    action.call(this);
  };

  this.start = function(){
    this.next();
    this.$el.modal();
  },

  this.end = function(){
    this.$el.modal('hide');
    moveEvent.start();
  }

  this.next = function (){
    if(this.isEnd){
      this.end();
      return ;
    }
    this.record = this.transformEventObj(this.data[this.$i]);
    this.isEnd = (this.$i++ === (this.data.length-1));
  }

  this.transformEventObj = function(obj){
    let record = _.cloneDeep(obj);
    if(typeof obj === 'string'){
      record = {
        msg: record
      }
    }
    // "['我没有']{1,1}|['我有的!']{2,1}"
    if(typeof record.buttons === 'string'){
      let buttons = _.map(record.buttons.split('|') ,function(str){
        str = str.match(/\[([^]+)\]\{([^]+)\}/)
        let btn = {};
        btn.title = str[1];
        if(str[2]){
          btn.action = function(){
            let [i, isEnd] = str[2].split(',');
            this.$i = Number(i);
            this.next();
            if(Number(isEnd)){
              this.isEnd = true;
            }
          }
        }
        return btn;
      })
      record.buttons = buttons;
    }
    console.log('record:',record);
    return record;
  }

  _.assign(this,_.cloneDeep(opt));

  this.start();

  $VueScope.DialogEvent = this;

}

const MapFight = function(opt, $VueScope){
  _.assign(this,_.cloneDeep(MapEvent));
  this.type = 'MapFight';
  this.$VueScope = $VueScope;
  this.data = {
    monsters: [ new Unit(opt) ]
  };
  
  this.start = function(){
    // 设置战斗数据
    $VueScope.$store.state['EVENT_FIGHT_MONSTERS'] = this.data.monsters;

    // 跳转到 战斗场景;
    location.href = "#/fight"
    
    // 设置战斗返回路径;
  }
  _.assign(this,_.cloneDeep(opt));
  
  this.start();
}

export {
  MapDialog,
  MapFight
};

