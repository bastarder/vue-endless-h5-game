import { EXP_TABLE } from "../data/game-data";
import SKILL_TABLE from "../data/skill-data";
import STATE_TABLE from "../data/state-data";

class Unit {
  constructor(x, y) {
    this.$type = 1;      // 单位类型
    this.$showName = 'unit1' // 展示名称
    this.$id = 1000 + (Math.random()* 1000).toFixed(0)  // 编号
    this.$hp = 250;       // 当前生命值
    this.$mp = 60;       // 当前魔法值
    this.$maxHp = 300;    // 生命最大值
    this.$maxMp = 150;    // 魔法最大值
    this.$exp = 1;      // 当前经验
    this.$maxExp = 5;   // 升级经验
    this.$level = 5;    // 等级
    this.$alive = true;
    this.$attr = {
      atk : 10,     // 攻击
      def : 10,     // 防御
      str : 10,     // 力量
      dex : 10,     // 敏捷
      con : 10,     // 体质
      int : 10      // 智力
    }
    this.$attrGrow = {
      str : 1,     // 力量
      dex : 2,     // 敏捷
      con : 3,     // 体质
      int : 4     // 智力
    }
    this.$status = [
      _.cloneDeep(STATE_TABLE[0]),
    ];
    this.$skills = [
      _.cloneDeep(SKILL_TABLE[0]),
      _.cloneDeep(SKILL_TABLE[1]),
      _.cloneDeep(SKILL_TABLE[2])
    ];  // 技能列表
    this.$package = [
      {
        name: '神剑',
        num : 1,
        label : [
          '武器', '剑', '神圣', '创始者',
        ],
        dsc : '传说中开天辟地诞生的一把神器!'
      },
      {
        name: '血瓶',
        num : 5,
        label : [
          '药物', '增益', '神圣',
        ],
        dsc : '第一瓶药物!'
      },
    ]; // 包裹列表
  }

  /**
   * 生命值改变
   */
  changeHp(value) {
    
    if(this.$hp <= 0){  // 判断单位是否存活;
      // console.warn('增加HP失败,目标单位已死亡!',this);
      return false;      
    }

    this.$hp = Math.min(this.$hp + value, this.$maxHp);  // 更新Hp的值;

    if(this.$hp <= 0){   // 判断更新后 单位是否存活;
      // console.warn('增加HP失败,目标单位已死亡!',this);
      this.$alive = false;
      return false;
    }

    // console.warn('增加HP成功,当前HP:',this.$hp);
    return true;
  }

  /**
   * 经验获取
   */
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
      for(var key in this.$attr){
        this.$attr[key] += this.$attrGrow[key];
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
    return force? this.$status.splice(obj,1) : _.remove(this.$status,obj);
  }

  /**
   * 状态变更 
   */
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
            self.$status.push(newState);
            index = self.$status.length - 1;
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
}

export default Unit;