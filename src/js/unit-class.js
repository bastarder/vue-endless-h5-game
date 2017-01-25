import { EXP_TABLE } from "../data/hero-data";
import SKILL_TABLE from "../data/skill-data";
import STATE_TABLE from "../data/state-data";
import { ITEM_TABLE } from "../data/item-data";
import store from '../store';
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
    this.$flashCopy = {
      $status: null,
      $skills: null,
    };
    this.$package = new Array(40);
    this.$houseList = new Array(40);
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
    this.$def         = 0;   // 防御
    this.$str         = 10;   // 力量
    this.$dex         = 10;   // 敏捷
    this.$con         = 10;   // 体质
    this.$int         = 10;   // 智力
    this.$critical    = 3; // 暴击几率
    this.$dodge       = 5; // 闪避几率
    this.$coolTimePer = 0;    // 冷却缩短
    this.$critiDmg = 1.5;  // 暴击伤害倍数;
    this.$dmgDown = [0,0]; // 伤害减免;
    this.$r = {};

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
    this.$equipments = [0,0,0,0,0,0,0,0,0];

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

    this.updateAttribute();
  }

  startFight(){
    console.info('Start Fight! copy state!');
    _.each(this.$flashCopy, (v,k) => {
      this.$flashCopy[k] = _.cloneDeep(this[k]);
    })
    _.each(this.$status, state => {
      state.stateEvent && state.stateEvent(this);
    })
    this.updateAttribute();
  }

  endFight(){
    // 清除状态事件;
    _.each(this.$status, state => {
      state.stateEventTimer && clearInterval(state.stateEventTimer);
    })
    // 恢复战前状态;
    _.each(this.$flashCopy, (v,k) => {
      v && (this[k] = v);
    })
    this.updateAttribute();
    // 如果死亡重置生命;
    !this.$alive && this.reset();
  }

  updateAttribute(){
    let hp_per = Math.min(this.$hp / (this.$r.$maxHp || this.$maxHp),1);
    let mp_per = Math.min(this.$mp / (this.$r.$maxMp || this.$maxMp),1);
    let promote = {
      // 基础值 基础百分 高级值 高级百分
      // ((默认 + 基础值) * (1 + 基础百分) + 高级值) * (1 +  高级百分)
      $maxHp       : [0,0,0,0],
      $maxMp       : [0,0,0,0],
      $atk         : [0,0,0,0],
      $def         : [0,0,0,0],
      $str         : [0,0,0,0],
      $dex         : [0,0,0,0],
      $con         : [0,0,0,0],
      $int         : [0,0,0,0],
      $critical    : [0,0,0,0],
      $dodge       : [0,0,0,0],
      $coolTimePer : [0,0,0,0],
      $critiDmg    : [0,0,0,0],
      $dmgDown : [0,0],
    }
    //powerUp, equip
    let group = [];
    _.each(this.$equipments,item => {
      if(item && item.equip){
        group.push(item.equip);
      }
    })
    _.each(this.$status,item => {
      if(item && item.powerUp){
        group.push(item.powerUp);
      }
    })
    _.each(group, item => {
      _.each(item, (v,k) => {
        if(promote[k]){
          let index = 0,up = v;
          if(typeof v === 'object'){
            index = v[1];
            up = v[0];
          }
          promote[k][index] += up;
        }
      })
    })

    _.each(promote, (v,k) => {
      if(k === '$dmgDown'){
        this.$r[k] = v;
        return ;
      }
      this.$r[k] = Math.floor(((this[k] + v[0]) * (1 + v[1] / 100) + v[2]) * (1 + v[3] / 100));
    })
    this.$hp = Math.floor(hp_per * this.$r.$maxHp) || 0;
    this.$mp = Math.floor(mp_per * this.$r.$maxMp) || 0;
    // console.log(this.$r);
  }

  changeMp(value) {
    value = parseInt(value);
    this.$mp = Math.min(this.$mp + value, this.$r.$maxMp);
    if(this.$mp < 0){
      this.$mp = 0;
    }
  }

  changeHp(value) {
    value = parseInt(value);
    if(this.$hp <= 0){  // 判断单位是否存活;
      // console.warn('增加HP失败,目标单位已死亡!',this);
      return false;      
    }

    this.$hp = Math.min(this.$hp + value, this.$r.$maxHp);  // 更新Hp的值;

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

  getState(obj, isIndex) {
    return isIndex ? _.findIndex(this.$status,obj) : _.find(this.$status,obj);
  }

  removeList(key, opt, isIndex) {
    if (!isIndex) {
      opt = _.findIndex(this.$status,{ id:opt.id });
      if(opt === -1){
        return ;
      }
    };
    this[key][opt].stateEventTimer && clearInterval(this[key][opt].stateEventTimer);
    this[key].splice(opt,1);
    this.updateAttribute();
  }

  changeState(changeList) {
    var self = this;
    _.each(changeList,function(value){
      var id = value.id;
      var state = self.getState({id});
      switch (value.state) {
        case "ADD":

          if(state){
            break;
          }

          let newState = PGET(id);

          _.each(value.action, i => {
            newState[i[0]] = i[1]
          });

          newState.stateEvent && newState.stateEvent(self);
          self.$status.push(newState);
        
          break;
        case "REMOVE":
          self.removeList('$status',{id});
          break;
        case "CHANGE":
          if(state){
            _.each(value.action, i => {
              self.$status[index][i[0]] = i[1]
            });
          }
          break;
      }
      this.updateAttribute();
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
  getItem(list, force){
    // pile
    let unit = force ? this : _.cloneDeep(this);

    let fullPackage = [];

    _.each(list,i => {
    
      let item = PGET(i[0]);
      let num = i[1];
      switch(item){
        case "gold":
          unit.$resource.gold += num;
          return ;
        case "gem":
          unit.$resource.gem += num;
          return ;
        case "exp":
          unit.getExp(num)
          return ;
      }
      // item : 新增物品 , num : 新曾数量 , packItem : 背包已存在的相同物品 , nextIndex : 空位
      let packItem = _.find(unit.$package,{ id: item.id });
      let nextIndex = _.findIndex(unit.$package, item => !item);

      item.pile && (item.num = num);
      // item.num = num

      // 可堆叠
      if(packItem && item.pile){
        // 存在
        packItem.num = (packItem.num || 0) + num;
      }else{
        // 不存在
        if(~nextIndex){
          // 有空位
          unit.$package[nextIndex] = item;
        }else{
          // 没空位
          fullPackage.push(i);
        }
      }

    });
    store.commit('UPDATE');
    return fullPackage;
  }

  // 装备
  equip(item, index){

    let upString = item.equip;
    // 非装备,无法装备;
    if(!upString){
      return ;
    }
    //0武器 1护肩 2鞋子 3腰带 4上衣 5绑腿 6戒指 7护腕 8项链
    console.log(1)
    // 删除包裹中的装备, 如果已有装备, 卸载装备;
    this.$package[index] = 0;

    if(this.$equipments[item.equipType]){
      this.demount(item.equipType, index);
    }

    this.$equipments[item.equipType] = item;

    // 更新属性;
    _.each(upString,(value, key) => {
      if(key === '$skills' || key === '$status'){
        _.each(value, id => {
          if(!_.find(this[key],{id})){
            let newSS = PGET(id);
            newSS.show = false;
            this[key].push(newSS);
          }
        })
      }
    })
    this.updateAttribute();
    store.commit('UPDATE');
  }

  // 卸下
  demount(type, index){
    let item = this.$equipments[type];

    this.$equipments[type] = 0;

    if(!item){
      return ;
    }

    if(index){
      this.$package[index] = item;
    }else{
      index = _.findIndex(this.$package,i => !i);
      if(~index){
        this.$package[index] = item;
      }else{
        console.warn('背包中没有空位,无法卸下装备');
        this.$equipments[type] = item;
        store.commit('UPDATE');
        return false;
      }
    }
    
    let upString = item.equip;

    _.each(upString,(value, key) => {
      if(key === '$skills' || key === '$status'){
        _.each(value, id => {
          this.removeList(key,{id});
        })
      }
    })
    this.updateAttribute();
    store.commit('UPDATE');
    
  }

  isEnoughInPackage(list){
    // [
    //   [200001, 5]
    // ]
    return _.every(list, item => {
      let pitem = _.find(this.$package,{id:item[0]});
      if(!pitem){
        return false;
      }
      return item[1] <= (pitem.num || 1);
    })
  }

}

export default Unit;