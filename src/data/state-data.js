// type: 1 作为攻击方时被提取;
// type: 2 作为被攻击方时被提取;
// type: 3 在判断所受伤害的时候被提取;

const STATE_TABLE = [
  {
    id: 2000001,
    name: '中毒',
    type: '1',
    logo: '毒',
    color: 'black',
    dsc : '你中毒了,每回合将会减少HP!',
    label : ['状态'],
    stateEvent : function(hero) {
      var self = this;
      var duration = 5;
      var per = 1;
      var current = 1;
      self.stateEventTimer = setInterval(function(){
        hero.changeHp(-10);
        current +=1;
        if(current > 5){
          clearInterval(self.stateEventTimer);
          hero.removeList('$status',self);
        }
      }, per * 1000);
      this.actived = true;
    }
  },
  {
    id: 2000002,
    name: '坚盾',
    type: '3',
    logo: '盾',
    color: 'red',
    dsc : '坚守之盾,免疫50%伤害',
    label : ['测试','状态'],
    powerUp : {
      $dmgDown : [50, 1],
    },
  },
  {
    id: 2000003,
    name: '暴击伤害提升(50%)',
    type: '1',
    logo: '爆',
    color: 'red',
    dsc : '暴击伤害提升(50%)',
    label : ['状态'],
    eventList: [
      `[11]
           action@{action.state.isCritical === true}
       #
           action@{action.set('atk_per', 50)}
      `
    ]
  },
  {
    id: 2000004,
    name: '反伤(30%)',
    type: '2',
    logo: '反',
    color: 'red',
    dsc : '反弹30%伤害',
    label : ['测试','状态'],
    eventList: [
      `[91]attacker@beAttack@ action.enemy_beAttack * 0.3
      `
    ]
  },
]

export default STATE_TABLE