import Vue from 'vue'
import router from './router'

import GameHeader from './components/game-header.vue'
import GameBottom from './components/game-bottom.vue'
import GamePackage from './components/game-package.vue'
import GameProgress from './components/game-progress.vue'

import App from './components/App.vue'

Vue.component('App', App)
Vue.component('game-header', GameHeader)
Vue.component('game-bottom', GameBottom)
Vue.component('game-package', GamePackage)
Vue.component('game-progress', GameProgress)

const app = new Vue({
  router
}).$mount('#app')



