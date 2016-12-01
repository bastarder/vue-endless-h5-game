  //   this.$type = 1;      // 单位类型
  //   this.$showName = 'unit1' // 展示名称
  //   this.$id = 1000 + (Math.random()* 1000).toFixed(0)  // 编号
  //   this.$hp = 600;       // 当前生命值
  //   this.$mp = 400;       // 当前魔法值
  //   this.$maxHp = 600;    // 生命最大值
  //   this.$maxMp = 400;    // 魔法最大值
  //   this.$exp = 1;      // 当前经验
  //   this.$maxExp = 5;   // 升级经验
  //   this.$level = 5;    // 等级
  //   this.$alive = true;
  //   this.$resource = {
  //     gold : 999,
  //     gem : 111,
  //   }
  //   this.$attr = {
  //     atk : 10,     // 攻击
  //     def : 10,     // 防御
  //     str : 10,     // 力量
  //     dex : 10,     // 敏捷
  //     con : 10,     // 体质
  //     int : 10      // 智力
  //   }
  //   this.$attrGrow = {
  //     str : 1,     // 力量
  //     dex : 2,     // 敏捷
  //     con : 3,     // 体质
  //     int : 4     // 智力
  //   }
  //   this.$status = [
  //     // _.cloneDeep(STATE_TABLE[0]),
  //     _.cloneDeep(STATE_TABLE[1]),
  //   ];
  //   this.$skills = [
  //     _.cloneDeep(SKILL_TABLE[3]),
  //     _.cloneDeep(SKILL_TABLE[2]),
  //     _.cloneDeep(SKILL_TABLE[1]),
  //     _.cloneDeep(SKILL_TABLE[0]),
  //   ];  // 技能列表
  //   this.$package = _.cloneDeep(ITEM_TABLE)
  //   obj ? _.assign(this, obj) : this.$defaultUnit = true;
  // }
const MONSTER = 2;

const MONSTER_DATA = [
  { 
    $level : 1,  
    $type : MONSTER,
    $showName : '小野猪',
    $id : 5000001,
    $maxHp : 600,
    $maxMp : 400,
    $atk : 10,     
    $def : 10,   
    $str : 10,     
    $dex : 10,    
    $con : 10,    
    $int : 10,
    $status : [],
    $skills : [1000001]
  }
]

export default MONSTER_DATA;