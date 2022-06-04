import Vue from 'vue'
import App from './App.vue'

// 三级联动组件---全局注册
import TypeNav from '@/components/TypeNav'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
// 引入MockServe.js  mock数据
import '@/mock/mockServer'
// 引入swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

// 引入路由
import router from './router'
// 引入仓库
import store from './store'

// 测试api统一管理
// import {reqCategoryList} from '@/api';
// reqCategoryList();

new Vue({
  render: h => h(App),
  // 注册路由，小写,这里写router时，组件身上都有$route，$router属性
  router,
  // 注册仓库:组件实例身上多了个$store属性
  store
}).$mount('#app')
