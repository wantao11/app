import Vue from 'vue'
import App from './App.vue'
//按需引入
import { Pagination, MessageBox } from 'element-ui'

// 三级联动组件---全局注册
import TypeNav from '@/components/TypeNav';

// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
// 使用分页器UI
Vue.component(Pagination.name, Pagination);
// 使用弹出框
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;



// 引入MockServe.js  mock数据
import '@/mock/mockServer'
// 引入swiper样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

// 引入路由
import router from './router'
// 引入仓库
import store from './store'

// 统一接口文件夹api里所有请求函数
import * as API from '@/api';

// 引入懒加载
import VueLazyload from 'vue-lazyload';
// 注册插件
Vue.use(VueLazyload)
//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins, { name: 'upper' });
//引入表单校验插件
import "@/plugins/validate";


new Vue({
  render: h => h(App),

  //全局事件总线$bus配置
  beforeCreate() {
    //此处的this就是这个new Vue()对象
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },

  // 注册路由，小写,这里写router时，组件身上都有$route，$router属性
  router,
  // 注册仓库:组件实例身上多了个$store属性
  store
}).$mount('#app')
