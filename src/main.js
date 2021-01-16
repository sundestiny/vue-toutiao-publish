import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.css'
import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


