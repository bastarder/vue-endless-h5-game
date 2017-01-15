const SKILL_TABLE = [
  {
    id: 1000001,
    name: '普通攻击',
    logo: '毒',
    dsc : '简简单单的一击',
    label : ['普攻','伤害'],
    defaultTime : 1000,
    currentCoolTime : 1000,
    coolTime : 0,
    eventList: [
      {
        weight: 1,
        event : function(action, attacker){
          // this 指向 所发动的技能本身; { id: 1000001, name: 'XXXX' ....}
          action.change('enemy_changeHp', 0 - attacker.$atk - 10);
        }
      },
      {
        weight: 1,
        event : function(action){
          action.change('attacker_changeHp', 2);
        }
      }
    ]
  },
  {
    id: 1000002,
    name: '测试',
    logo: '狂',
    dsc : '这是一个用来测试的技能对象2',
    label : ['测试2','伤害2'],
    defaultTime : 3000,
    currentCoolTime : 3000,
    coolTime : 0,
    restrict : [
      "[attacker]{$mp} >= {60}",
      "[attacker]{$hp} <= {250}",
      "[attacker]{$skills} nothas {1000003,1000001}",
      "[attacker]{$status} has {2000001}",
      "[skill]{coolTime} > {0}",
      function(skill, attacker, enemy){
        return true;
      }
    ],
    eventList: [
      {
        weight: 1,
        event : function(action){
          action.change('attacker_changeState',[{
            id: 2000001,
            state: "REMOVE"
          }])
        }
      }
    ]
  },
  {
    id: 1000003,
    name: '毒物',
    logo: '盾',
    dsc : '释放一个圣盾,免疫50%上海',
    label : ['测试2','伤害2'],
    defaultTime : 5000,
    currentCoolTime : 5000,
    coolTime : 0,
    restrict : [
      "[attacker]{$mp} >= {105}",
    ],
    eventList: [
      {
        weight: 1,
        event : function(action){
          action.change('attacker_changeMp', 0 - 105);
          action.change('enemy_changeState',[{
            id: 2000001,
            state: "ADD"
          }])
        }
      }
    ]
  },
  {
    id: 1000004,
    name: '破釜沉舟',
    logo: '盾',
    dsc : '伤敌1000自损800',
    label : ['测试2','伤害2'],
    defaultTime : 10000,
    currentCoolTime : 10000,
    coolTime : 0,
    eventList: [
      {
        weight: 1,
        event : function(action){
          action.change('enemy_changeHp', -100);
          action.change('attacker_changeHp', -50);
        }
      }
    ]
  }
];

export default SKILL_TABLE