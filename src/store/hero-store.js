import Vue from 'vue'
import Vuex from 'vuex'
import Unit from '../js/unit-class'
import MAP_TABLE from '../data/map-data'

import MONSTER_DATA from '../data/monster-data';
import SKILL_TABLE from "../data/skill-data";
import STATE_TABLE from "../data/state-data";
import {ITEM_TABLE} from '../data/item-data';
import PGET from '../js/public-static-get';


let test1 = PGET(3000001);
test1.num = 10;
let test2 = PGET(3000002);
test2.num = 5;

var hero = new Unit(
  {
    $showName : 'Bastarder',
    $type    : 'Hero',
    $skills  : [PGET(1000001),PGET(1000002),PGET(1000003),PGET(1000004)],
    $status  : [],
    $resource : {
      gold: 99999,
      gem : 899999
    },
    $package : [test1,test2].concat(_.cloneDeep(ITEM_TABLE).slice(2)).concat(new Array(26))
  }
);

const state = {
  hero : hero,
}

const mutations = {

}

export default {
  state,
  mutations
}