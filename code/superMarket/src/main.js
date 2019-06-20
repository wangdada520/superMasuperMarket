import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入request
import request from './utils/request'
// 挂载原型
Vue.prototype.request = request;
// 引入 local 文件
import local from '@/utils/local'
// 引入echarts文件 并挂载在Vue原型上
import echarts from 'echarts';
Vue.prototype.echarts=echarts;
//引入element-ui
import ElementUI from 'element-ui';//js组件
import 'element-ui/lib/theme-chalk/index.css';//css组件
import './assets/css/base.css'
// 注册
Vue.use(ElementUI);

// 路由守卫
router.beforeEach((to,from,next)=>{
  // alert('路由守卫');
  
  // 获取token
  const token =local.get('wdd_token')
  // 判断
  if(token){
    // 如果有token令牌直接放行
    next()
  }else{
    // 如果去登录直接放行
    if(to.path==='/login'){
      next()
    }else{
        next({path:'/login'})
    }
  
  }
})
//阻止生产提示
Vue.config.productionTip = false

new Vue({//创建vue 路由
  router, //传入路由 才能使用路由相关的组件功能
  render: h => h(App)//传入顶级app.vue渲染
}).$mount('#app')//挂载dom
