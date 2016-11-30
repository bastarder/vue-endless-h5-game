  // {
  //   id: 8000001,
  //   name: '村庄',
  //   logo: '',
  //   dsc: '一个几乎毫无危险的地方.',
  //   eventList: [

  //   ],    // 特殊事件触发点;
  //   monsterList: [],  // 怪物列表;
  //   itemList: [       // 物品列表;
      
  //   ],
  //   rule: [          // 生成规则;

  //   ]
    
  // },

const MapEvent = {
  data: [],
  type: '',
  init: function(data){
    this.data = data;
  }
}

const MapDialog = function(opt, $VueScope){
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
  }

  this.next = function (){
    if(this.isEnd){
      this.end();
      return ;
    }
    let record = this.data[this.$i];
    if(typeof record === 'string'){
      record = {
        msg: record
      }
    }
    this.record = record;
    this.isEnd = (this.$i++ === this.data.length);
  }

  _.assign(this,_.cloneDeep(opt));

  this.start();

  return this;
}

export {
  MapDialog
};

// {
//   x: 1,
//   y: 2,
//   event: [

//   ]
// }


// 对话事件;