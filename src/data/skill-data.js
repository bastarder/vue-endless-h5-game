const SKILL_TABLE = [
  {
    id: 1000001,
    name: '普通攻击',
    dsc : '简简单单的一击',
    label : ['普攻','伤害'],
    defaultTime : 1000,
    currentCoolTime : 1000,
    coolTime : 0,
    eventList: [
      `[11]enemy@beAttack@attacker.$r.$atk`
    ]
  },
  {
    id: 1000002,
    name: '净化',
    dsc : '净化中毒效果~',
    label : ['测试2','伤害2'],
    defaultTime : 3000,
    currentCoolTime : 3000,
    coolTime : 0,
    restrict : [
      // "[attacker]{$mp} >= {60}",
      // "[attacker]{$hp} <= {250}",
      // "[attacker]{$skills} nothas {1000003,1000001}",
      // "[attacker]{$status} has {2000001}",
      // "[skill]{coolTime} > {0}",
      function(skill, attacker, enemy){
        return true;
      }
    ],
    eventList: [
      `[11]enemy@changeState@[{ id: 2000001, state: "REMOVE" }]`
    ]
  },
  {
    id: 1000003,
    name: '毒物',
    dsc : '是敌人进入中毒状态!',
    label : ['测试2'],
    defaultTime : 5000,
    currentCoolTime : 5000,
    coolTime : 0,
    restrict : [
      "[attacker]{$mp} >= {105}",
    ],
    eventList: [
      `[11]
          enemy@changeState@[{ id: 2000001, state: "ADD" }];
          enemy@changeMp@-105
      `
    ]
  },
  {
    id: 1000004,
    name: '破釜沉舟',
    logo: '盾',
    dsc : '造成自身攻击*2的伤害,但是会自身受到自身攻击*0.3的伤害',
    label : ['测试2','伤害2'],
    defaultTime : 10000,
    currentCoolTime : 10000,
    coolTime : 0,
    eventList: [
      `[11]
          enemy@beAttack@ attacker.$r.$atk * 2;
          attacker@beAttack@ attacker.$r.$atk * 0.3
      `
    ]
  },
  {
    id: 1000005,
    name: '致死',
    logo: '盾',
    dsc : '造成大量伤害,有很大的几率一击必杀!',
    label : ['测试2','伤害2'],
    defaultTime : 10000,
    currentCoolTime : 10000,
    coolTime : 0,
    eventList: [
      `[11]
        action@{Math.random() > 0.98}
       #
        enemy@beAttack@9999999
      `,
    ]
  },
  // {
  //   id: 1000006,
  //   name: '测试精简数据',
  //   logo: '毒',
  //   dsc : '简简单单的一击',
  //   label : ['普攻','伤害'],
  //   defaultTime : 1000,
  //   currentCoolTime : 1000,
  //   coolTime : 0,
  //   eventList : [
  //     `[1]enemy@changeHp@attacker.$atk`,
  //     `[2]attacker@changeHp@2`,
  //     `[3]
  //         action@{action.state.isCritical === true};
  //         attacker@{attacker.$hp > (attacker.$hp * 0.5)}
  //      #
  //         enemy@changeState@[{ id: 2000001, state: "ADD" }];
  //         enemy@changeHp@attacker.$atk
  //     `
  //     ,
  //     `[4]action@{action.state.isCritical = true}`,
  //   ]
  // }
];

export default SKILL_TABLE