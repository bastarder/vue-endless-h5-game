import { EXP_TABLE } from "../data/hero-data";

const CreateHero = function(option = {}){

  let opt = _.cloneDeep(option);

  opt.$exp = opt.$exp || 0;      // 当前经验

  opt.$level = opt.$level || 1;

  opt.$maxExp = opt.$maxExp || EXP_TABLE[opt.$level - 1];   // 升级经验

  opt.$package = opt.$package || new Array(40);

  opt.$houseList = opt.$houseList || new Array(40);

  opt.$equipments = opt.$equipments || [0,0,0,0,0,0,0,0,0];

  opt.$resource = opt.$resource || {
    gold : 50,
    gem : 0,
  };

  opt.$flashCopy = {
    $status: null,
    $skills: null,
  };

  opt.$attrGrow = {
    maxHp : 10,
    maxMp : 10,
    atk : 5,
    def : 2,
    str : 1,     // 力量
    dex : 2,     // 敏捷
    con : 3,     // 体质
    int : 4     // 智力
  }

  _.assign(this, opt);

};

export default CreateHero;