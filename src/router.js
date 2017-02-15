import Vue from 'vue'
import VueRouter from "vue-router";

import GameHome from './components/game-home.vue'
import GameFight from './components/game-fight.vue'
import GameMap from './components/game-map.vue'
import GameMapActive from './components/game-map-active.vue'
import GameLogin from './components/game-login.vue'
import GameConfig from './components/game-config.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: GameLogin
  },
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
  },{
    path: '/config',
    component: GameConfig
  }
]

const router = new VueRouter({
  routes 
})

export default router;
