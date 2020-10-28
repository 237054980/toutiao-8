import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

import Vant from 'vant'
import 'vant/lib/index.css'
//import './utils/dayjs.js'
//加载全局样式
import less from'./styles/index.less'


Vue.use(Vant);

Vue.config.productionTip = false


//创建根实例  将 router , store 配置到根实例中
//把 app根组件渲染到 #app 节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
