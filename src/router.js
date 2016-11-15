import Vue from 'vue'
import VueRouter from "vue-router";

import ViewHome from './components/view-home.vue'
import GameFight from './components/game-fight.vue'

Vue.component('game-fight', GameFight)
Vue.component('view-home', ViewHome)

Vue.use(VueRouter)

const routes = [
  { 
    path: '/home', 
    component: ViewHome
  },{ 
    path: '/fight', 
    component: GameFight
  }
]

const router = new VueRouter({
  routes 
})

export default router;
