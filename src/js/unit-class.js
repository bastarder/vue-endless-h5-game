import { EXP_TABLE } from "../data/hero-data";
import SKILL_TABLE from "../data/skill-data";
import STATE_TABLE from "../data/state-data";
import { ITEM_TABLE } from "../data/item-data";

import CreateMonster from './create-monster';
import { GetRange, GetRandom } from './public-random-range';
import PGET from '../js/public-static-get';

class Unit {
  constructor(obj = {}) {
    this.$type = 1;      // 单位类型
    this.$showName = 'unit1' // 展示名称
    this.id = 1000 + (Math.random()* 1000).toFixed(0)  // 编号
    this.$exp = 1;      // 当前经验
    this.$maxExp = 5;   // 升级经验
    this.$level = 5;    // 等级
    this.$alive = true;
    this.$status = [];
    this.$skills = [];  // 技能列表
    this.$package = new Array(10);
    this.$resource = {
      gold : 999,
      gem : 111,
    };


    // 属性方面
    this.$hp          = 600;  // 当前生命值
    this.$mp          = 400;  // 当前魔法值
    this.$maxHp       = 600;  // 生命最大值
    this.$maxMp       = 400;  // 魔法最大值
    this.$atk         = 10;   // 攻击
    this.$def         = 10;   // 防御
    this.$str         = 10;   // 力量
    this.$dex         = 10;   // 敏捷
    this.$con         = 10;   // 体质
    this.$int         = 10;   // 智力
    this.$critical    = 3; // 暴击几率
    this.$dodge       = 5; // 闪避几率
    this.$coolTimePer = 0;    // 冷却缩短

    this.$attrUp = { // 左静,右动; 每次结束后应清空动态;
      $maxHp       : [ [0,0],[0,0] ],
      $maxMp       : [ [0,0],[0,0] ],
      $atk         : [ [0,0],[0,0] ],
      $def         : [ [0,0],[0,0] ],
      $str         : [ [0,0],[0,0] ],
      $dex         : [ [0,0],[0,0] ],
      $con         : [ [0,0],[0,0] ],
      $int         : [ [0,0],[0,0] ],
      $critical    : [ [0,0],[0,0] ],
      $dodge       : [ [0,0],[0,0] ],
      $coolTimePer : [ [0,0],[0,0] ]
    }

    this.$attrGrow = {
      maxHp : 10,
      maxMp : 10,
      atk : 5,
      def : 2,
      str : 1,     // 力量
      dex : 2,     // 敏捷
      con : 3,     // 体质
      int : 4     // 智力
    }

    // 装备
    this.$equipments = [0,0,0,0,0,0,0,0,0,0,0];

    switch(obj.$type){
      case 'Monster' : 
        CreateMonster.call(this, obj);
        break;
      case 'Hero' : 
        // CreateHero.call(this, obj);
        break;
      default : 
        _.assign(this, obj);
        break;
    }

  }
  getSnapshoot(key) {
    let list = [ '$atk','$def', '$str', '$dex', '$con', '$int', '$maxHp', '$maxMp', '$critical', '$dodge', '$coolTimePer'];
    
    if(!~list.indexOf(key)){
      return this[key];
    }

    let baseV = this[key];
    let staticUp = this.$attrUp[key][0];
    let dynamicUp = this.$attrUp[key][1];
    
    let fixUp = staticUp[0] + dynamicUp[0];
    let perUp = staticUp[1] + dynamicUp[1];

    return Math.floor(baseV + baseV * perUp + fixUp);
  }

  changeMp(value) {
    this.$mp = Math.min(this.$mp + value, this.$maxMp);
    if(this.$mp < 0){
      this.$mp = 0;
    }
  }

  changeHp(value) {

    if(this.$hp <= 0){  // 判断单位是否存活;
      // console.warn('增加HP失败,目标单位已死亡!',this);
      return false;      
    }

    this.$hp = Math.min(this.$hp + value, this.$maxHp);  // 更新Hp的值;

    if(this.$hp <= 0){   // 判断更新后 单位是否存活;
      // console.warn('增加HP失败,目标单位已死亡!',this);
      this.$hp = 0;
      this.$alive = false;
      return false;
    }

    // console.warn('增加HP成功,当前HP:',this.$hp);
    return true;
  }

  getExp(value) {
    // EXP_TABLE 经验列表 来源: "./game-data";

    if(this.$level >= EXP_TABLE.length){
      console.warn('单位已经达到等级上限,经验值将被累积!');
      this.$exp += value;
      return true;
    }

    var exp = this.$exp + value;

    if(exp > this.$maxExp){
      this.$exp = exp - this.$maxExp;
      this.$level += 1;
      this.$maxExp = EXP_TABLE[this.$level - 1] || NaN;
      // 升级增加属性;
      for(var key in this.$attrGrow){
        this[key] += this.$attrGrow[key];
      }
      console.warn('单位升级,属性增加!', this.$attrGrow);
    }else{
      this.$exp = exp;
    }

    console.warn('单位升级,当前经验值:',this.$exp,'当前等级:',this.$level,'下级所需经验:',this.$maxExp);
  }

  getState(obj, force) {
    return force? _.findIndex(this.$status,obj) : _.find(this.$status,obj);
  }

  removeState(obj, force) {
    if (!force) {
      obj = _.findIndex(this.$status,obj);
      if(obj === -1){
        return ;
      }
    };
    this.$status[obj].stateEventTimer && clearInterval(this.$status[obj].stateEventTimer);
    this.$status.splice(obj,1);
  }

  changeState(changeList) {
    var self = this;
    _.each(changeList,function(value){
      var id = value.id;
      var index = self.getState({id}, true);
      switch (value.state) {
        case "ADD":
          if(index > -1){
            break;
          }

          var newState = _.cloneDeep(_.find(STATE_TABLE,{id}));
          if(newState){
            _.each(value.action,function(action){
              newState[action[0]] = action[1]
            });
            newState.stateEvent && newState.stateEvent(self);
            self.$status.push(newState);
          }else{
            console.warn("添加状态失败:",value);
            break;
          }
        
          break;
        case "REMOVE":
          self.removeState({id});
          break;
        case "CHANGE":
          if(index > -1){
            _.each(value.action,function(action){
              self.$status[index][action[0]] = action[1]
            });
          }
          break;
      }
    })

  }

  reset(){
    this.$alive = true;
    this.$hp = this.$maxHp;
    this.$mp = this.$mp;
  }

  // 怪物掉落
  dieDrop(getter){
    // $dropList : [
    //   // 物品ID, 数量范围, 几率
    //   [3000001, [3, 10], 1],
    //   [3000002, 5, 0.3],
    //   [3000003, 1, 0.5],
    //   ['gold',[1, 80], 1],
    //   ['exp', 1, 1]
    // ]
    let list = [];

    _.each(this.$dropList, item => {
      let [id, num, odds] = item;

      if(!GetRandom(odds)){
        return ;
      }

      num = GetRange(num);

      if(num === 0){
        return ;
      }

      list.push(
        [id, num]
      )
    })

    return list;
  }

  // 获得物品
  getItem(list){
    // pile

    console.log(list);
    let fullPackage = [];

    _.each(list,i => {
    
      let item = PGET(i[0]);
      let num = i[1];
      switch(item){
        case "gold":
          this.$resource.gold += num;
          return ;
        case "gem":
          this.$resource.gem += num;
          return ;
        case "exp":
          this.getExp(num)
          return ;
      }
      // item : 新增物品 , num : 新曾数量 , packItem : 背包已存在的相同物品 , nextIndex : 空位
      let packItem = _.find(this.$package,{ id: item.id });
      let nextIndex = _.findIndex(this.$package, item => !item);

      // item.pile && (item.num = num);
      item.num = num

      // 可堆叠
      if(packItem && item.pile){
        // 存在
        packItem.num += num;
      }else{
        // 不存在
        if(~nextIndex){
          // 有空位
          this.$package[nextIndex] = item;
        }else{
          // 没空位
          fullPackage.push(i);
        }
      }


    });

    return fullPackage;
  }

  // 装备
  equip(item, index){

    let upString = item.equip;
    // 非装备,无法装备;
    if(!upString){
      return ;
    }
    //0武器 1护肩 2鞋子 3腰带 4上衣 5绑腿 6戒指 7护腕 8项链 9辅助槽 10魔法槽
    if(this.$equipments[item.equipType]){
      return false;
    }

    this.$equipments[item.equipType] = item;

    // 删除包裹中的装备, 如果已有装备, 卸载装备;

    // 更新属性;
    _.each(upString,(value, key) => {
      if(key === '$skills' || key === '$status'){
        _.each(value, id => {
          if(!_.find(this[key],{id})){
            let newSS = PGET(id);
            newSS.keep = true;
            this[key].push(newSS);
          }
        })
      }else{
        if(typeof value === "string"){
          // per
          this.$attrUp[key][0][1] += Number(value);
        }else{
          // fix
          this.$attrUp[key][0][0] += value;
        }
      }
    })

  }

  // 卸下
  demount(type){
    let item = this.$equipments[type];
    this.$equipments[type] = 0;
    if(!item){
      return ;
    }
    let upString = item.equip;

    _.each(upString,(value, key) => {
      if(key === '$skills' || key === '$status'){
        _.each(value, id => {
          let index = _.findIndex(this[key],{id});
          ~index && this[key].splice(index,1);
        })
      }else{
        if(typeof value === "string"){
          // per
          this.$attrUp[key][0][1] -= Number(value);
        }else{
          // fix
          this.$attrUp[key][0][0] -= value;
        }
      }
    })

  }

}

export default Unit;