import Vue from 'vue'
import App from './App.vue'
import router from './router'


// 引入echarts文件 并挂载在Vue原型上
import echarts from 'echarts';
Vue.prototype.echarts=echarts;
//引入element-ui
import ElementUI from 'element-ui';//js组件
import 'element-ui/lib/theme-chalk/index.css';//css组件
import './assets/css/base.css'
// 注册
Vue.use(ElementUI);
//阻止生产提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
