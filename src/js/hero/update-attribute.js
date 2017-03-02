export default function updateAttribute(){

  // 记录当前血量,魔量百分比;
  let hp_per = Math.min(this.$hp / (this.$r.$maxHp || this.$maxHp), 1);
  let mp_per = Math.min(this.$mp / (this.$r.$maxMp || this.$maxMp), 1);

  let promote = {
    // 基础值 基础百分 高级值 高级百分
    // ((默认 + 基础值) * (1 + 基础百分) + 高级值) * (1 +  高级百分)
    $maxHp       : [0,0,0,0],    // 血量最大值
    $maxMp       : [0,0,0,0],    // 魔法最大值
    $atk         : [0,0,0,0],    // 攻击
    $def         : [0,0,0,0],    // 防御
    $str         : [0,0,0,0],    // 力量
    $dex         : [0,0,0,0],    // 敏捷
    $con         : [0,0,0,0],    // 体质
    $int         : [0,0,0,0],    // 智力
    $critical    : [0,0,0,0],    // 暴击几率    90 => 暴击率90%
    $dodge       : [0,0,0,0],    // 闪避几率    90 => 闪避率90%
    $coolTimePer : [0,0,0,0],    // 冷却时间减少 10 => 冷却时间减少10%
    $critiDmg    : [0,0,0,0],    // 暴击伤害倍数 1.5 => 1.5倍
    $dmgDown     : [0,0],        // 伤害减少 [5,10], 免伤 5 + 10%
  }

  let data = (this.$equipments || []).concat(this.$status || []);

  let action = {
    $default : function(key,v){
      this.$r[key] = Math.floor(((this[key] + v[0]) * (1 + v[1] / 100) + v[2]) * (1 + v[3] / 100));
    },
    $dmgDown : function(key,v){
      this.$r[key] = v;
    }
  }

  // 计算基础属性
  for(let item of data){
    
    if(!item){
      continue;
    }

    let opt = [item.equip, item.powerUp, item.intPowerUp];

    for(let obj of opt){
      if(!obj){
        continue;
      }
      for(let key in obj){
        let v = obj[key];

        if(!promote[key]){
          continue;
        }

        let index = 0,up = v;

        if(v instanceof Array){
          index = v[1];
          up = v[0];
        }

        promote[key][index] += up;
      }
    }

  };

  for(let key in promote){
    action[action[key] ? key : '$default'].apply(this, [key, promote[key]]);
  }

  // 计算属性对属性的影响;

  action = [
    function $str(){
      this.$r.$atk += (this.$r.$str * (this.$r.$atk * 0.004));
    },
    function $int(){
      this.$r.$maxMp += (this.$r.$int * (this.$r.$maxMp * 0.004));
    },
    function $con(){
      this.$r.$maxHp += (this.$r.$con * (this.$r.$maxHp * 0.004));
    },
    function $dex(){
      this.$r.$critical += (this.$r.$critical * 0.005)
      this.$r.$dodge += (this.$r.$critical * 0.001)
    }
  ]

  for(let act of action){
    act.call(this);
  }

  this.$hp = Math.floor(hp_per * this.$r.$maxHp) || 0;
  this.$mp = Math.floor(mp_per * this.$r.$maxMp) || 0;

}