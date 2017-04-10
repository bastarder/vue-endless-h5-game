const actionClass = function(attacker, enemy){

  this.state = {
    attacker : attacker,
    enemy : enemy,
    isCritical : false,
    isMiss : false,
    isMust : false,
    holyDmge : 0,
    holyDmga : 0,
    cure : 0,
    cure_per : 0,
    atk : 0,
    atk_per : 0,
  }

};

actionClass.prototype.CountFinal = function(){
  let s = this.state;
  // this.attacker_beAttack  this.enemy_beAttack;
  if(this.attacker_beAttack){
    this.attacker_beAttack = Math.floor(
      this.attacker_beAttack * (1 + s.atk_per / 100) + s.atk
    );
  }
  if(this.enemy_beAttack){
    this.enemy_beAttack = Math.floor(
      this.enemy_beAttack * (1 + s.atk_per / 100) + s.atk
    );
    if(s.isCritical){
      this.enemy_beAttack = Math.floor(
        this.enemy_beAttack * s.attacker.$critiDmg
      );
    }
  }
  if(this.attacker_beCure){
    this.attacker_beCure = Math.floor(
      this.attacker_beCure * (1 + s.cure_per / 100) + s.cure
    );
  }
  if(this.enemy_beCure){
    this.enemy_beCure = Math.floor(
      this.enemy_beCure * (1 + s.cure_per / 100) + s.cure
    );
  }
}

actionClass.prototype.init = function(){
  let s = this.state;
  let [v,per] = s.attacker.$r.$dmgDown;
  let atk = ((this.attacker_beAttack || 0) - v - s.attacker.$r.$def) * (1 - per / 100);
  atk = atk > 0 ? atk : 0;
  console.log(this)
  this.attacker_changeHp = (this.attacker_beCure || 0) - atk - s.holyDmga;

  [v,per] = s.enemy.$r.$dmgDown;
  atk = ((this.enemy_beAttack || 0) - v - s.enemy.$r.$def) * (1 - per / 100);
  atk = atk > 0 ? atk : 0;

  this.enemy_changeHp = (this.enemy_beCure || 0) - atk - s.holyDmge;
  this.state.isCritical && console.info('暴击!');
  this.state.isMiss && console.info('闪避!');
  this.state.isMust && console.info('必中!');
  delete this.attacker_beCure
  delete this.attacker_beAttack
  delete this.enemy_beCure
  delete this.enemy_beAttack
  // delete this.state
}

actionClass.prototype.change = function(key, value, cover) {
  if(this[key]){
    if(cover){
      this[key] = value;
    }else{
      if(this[key] instanceof Array){
        this[key] = this[key].concat(value);
      }else{
        this[key] += value;
      }
    }
  }else{
    this[key] = value;
  }
}

actionClass.prototype.set = function(key, value, index){
  if(index === undefined){
    this.state[key] += value
  }else{
    this.state[key][index] += value
  }
}

export default actionClass;