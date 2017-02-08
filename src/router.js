import Vue from 'vue'
import VueRouter from "vue-router";
import store from "./store"

import GameHome from './components/game-home.vue'
import GameFight from './components/game-fight.vue'
import GameMap from './components/game-map.vue'
import GameMapActive from './components/game-map-active.vue'

Vue.component('game-fight', GameFight)
Vue.component('game-home', GameHome)
Vue.component('game-map', GameMap)
Vue.component('game-map-active', GameMapActive)


Vue.use(VueRouter)

const routes = [
  { 
    path: '/', 
    component: GameHome
  },{ 
    path: '/fight', 
    component: GameFight
  },{
    path: '/map',
    component: GameMap
  },{
    path: '/map-active',
    component: GameMapActive
  }
]

const router = new VueRouter({
  routes 
})

export default router;
