const SKILL_TABLE = [
  {
    id: 1000001,
    name: '普通攻击',
    weight: 0,
    type: '1',
    logo: '毒',
    dsc : '简简单单的一击',
    label : ['普攻','伤害'],
    defaultTime : 1000,
    coolTime : 0,
    event: function(action){
      action.change('enemy_changeHp', 0 - 50);
    },
    active: true
  },
  {
    id: 1000002,
    name: '净化',
    weight: 10,
    type: '1',
    logo: '狂',
    dsc : '这是一个用来测试的技能对象2',
    label : ['测试2','伤害2'],
    defaultTime : 5000,
    coolTime : 0,
    event: function(action){
      action.change('attacker_changeState',[{
        id: 2000001,
        state: "REMOVE"
      }])
    },
    active: false
  },
  {
    id: 1000003,
    name: '圣盾术',
    weight: 10,
    type: '1',
    logo: '盾',
    dsc : '释放一个圣盾,免疫50%上海',
    label : ['测试2','伤害2'],
    defaultTime : 3000,
    coolTime : 0,
    event: function(action){
      action.change('attacker_changeState',[{
        id: 2000002,
        state: "ADD"
      }])
    },
    active: false
  }
];

export default SKILL_TABLE