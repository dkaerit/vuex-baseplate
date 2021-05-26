//import devtools from '@vue/devtools'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//function onDeviceReady () { devtools.connect('http://192.168.1.15')}
//if (window.location.protocol === 'file:') document.addEventListener('deviceready', onDeviceReady, false)
//else onDeviceReady()
