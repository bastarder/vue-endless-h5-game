import Vue from 'vue'
import VueRouter from "vue-router";

import GameHome from './components/game-home.vue'
import GameFight from './components/game-fight.vue'
import GameMap from './components/game-map.vue'
import GameMapActive from './components/game-map-active.vue'
import GameLogin from './components/game-login.vue'
import GameConfig from './components/game-config.vue'
import GameSmithy from './components/game-smithy.vue'
import GameShop from './components/game-shop.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: GameLogin
  },{ 
    path: '/', 
    name: 'home',
    component: GameHome
  },{ 
    path: '/fight', 
    name: 'fight',
    component: GameFight
  },{
    path: '/map',
    name: 'map',
    component: GameMap
  },{
    path: '/map-active',
    name: 'mapActive',
    component: GameMapActive
  },{
    path: '/config',
    name: 'config',
    component: GameConfig
  },{
    path: '/smithy',
    name: 'smithy',
    component: GameSmithy
  },{
    path: '/shop',
    name: 'shop',
    component: GameShop
  }
]

const router = new VueRouter({
  routes ,
})

router.beforeEach((to, from, next) => {
  // if(from.path === to.path){
  //   location.reload();
  // }
  next();
});

export default router;
