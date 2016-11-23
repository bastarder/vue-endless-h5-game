import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import store from './store'

// directive

// components
import App from './components/App.vue'
import GameHeader from './components/game-header.vue'
import GameBottom from './components/game-bottom.vue'
import GamePackage from './components/game-package.vue'
import GameProgress from './components/game-progress.vue'
import CooltimeProgress from './components/cooltime-progress.vue'

Vue.component('App', App)
Vue.component('game-header', GameHeader)
Vue.component('game-bottom', GameBottom)
Vue.component('game-package', GamePackage)
Vue.component('game-progress', GameProgress)
Vue.component('cooltime-progress', CooltimeProgress)

const app = new Vue({
  store,
  router
}).$mount('#app')




