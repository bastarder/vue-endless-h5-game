import { GetRange, GetRandom } from '../js/public-random-range';

const SKILL_TABLE = [
  {
    id: 1000001,
    name: '斩',
    dsc : '简简单单的一击',
    label : ['普攻','伤害'],
    defaultTime : 1000,
    eventList: [
      `[11]enemy@beAttack@attacker.$r.$atk`
    ]
  },
  {
    id: 1000002,
    name: '魔',
    dsc : '造成双倍伤害,并恢复等同于伤害的血量,有一定几率使对方进入中毒状态.',
    label : ['吸血','加倍'],
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
      `[11]
          enemy@beAttack@ attacker.$r.$atk * 2;
      `,{
        width: 11,
        eventStr : function(action, attacker, enemy){
          if(GetRandom(100)){
            action.change('enemy_changeState',[
              { id: 2000001, state: "ADD" }
            ])
          }
        }
      },{
        width: 91,
        eventStr : function(action, attacker, enemy){
          console.log(action)
          action.change('attacker_beCure', action.enemy_beAttack)
        }
      },
    ]
    // eventList: [
    //   `[11]attacker@changeState@[{ id: 2000001, state: "REMOVE" }]`
    // ]
  },
  {
    id: 1000003,
    name: '圣光术',
    dsc : '恢复大量生命!',
    label : ['恢复'],
    defaultTime : 5000,
    restrict : [
      "[attacker]{$mp} >= {105}",
    ],
    eventList: [
      `[11]
          attacker@changeMp@-15;
          attacker@beCure@ attacker.$r.$maxHp * 0.5
      `
    ]
  },
  {
    id: 1000004,
    name: '净',
    dsc : '净化负面状态!',
    label : ['测试2','伤害2'],
    defaultTime : 10000,
    eventList: [
      `[11]attacker@changeState@[{ id: 2000001, state: "REMOVE" }]`
    ]
    // eventList: [
    //   `[11]
    //       enemy@beAttack@ attacker.$r.$atk * 2;
    //       attacker@beAttack@ attacker.$r.$atk * 0.3
    //   `
    // ]
  },
  {
    id: 1000005,
    name: '致死',
    logo: '盾',
    dsc : '造成大量伤害,有很大的几率一击必杀!',
    label : ['测试2','伤害2'],
    defaultTime : 10000,
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