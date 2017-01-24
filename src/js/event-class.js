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
    this.record = this.transformEventObj(this.$i);
    this.isEnd = (this.$i++ === (this.data.length-1));
  }

  this.transformEventObj = function(index){
    let record = _.cloneDeep(this.data[index]);
    if(typeof record === 'string'){
      record = {
        msg: record
      }
    }
    // "['我没有']{1,1}|['我有的!']{2,1}"
    let buttons = _.map(record.buttons,function(str){
      if(typeof str === 'object'){
        return str;
      }
      let strc = str;
      str = str.match(/\[([^]+)\]\{([^]+)\}/)
      let btn = {};
      btn.title = str[1];
      if(!str[2]){
        return btn;
      }
      if(strc[0] !== '#'){
        btn.action = function(){
          let [i, isEnd] = str[2].split(',');
          this.$i = Number(i);
          this.next();
          if(Number(isEnd)){
            this.isEnd = true;
          }
        }
      }else{
        let i = str[2].split(',');
        let isEnd = i.unshift();
        btn.action = function(){
          let need = this.data[index].need || [];
          let get = this.data[index].get || [];
          let unit = this.$VueScope.$store.state.hero;
          console.log(need,get,unit);
          let enough = unit.isEnoughInPackage(need);
          if(!enough){
            this.$i = i[0]
          }else{
            let left = unit.getItem(get);
            if(left.length){
              this.$i = i[1]
            }else{
              unit.getItem(get, true);
              this.$i = i[2]
            }
          }
          this.next();
          if(Number(isEnd)){
            this.isEnd = true;
          }
        }
      }
      return btn;
    })
    record.buttons = buttons;

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

