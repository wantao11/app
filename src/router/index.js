// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


// 使用插件
Vue.use(VueRouter)

// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCarSuccess from '@/pages/AddCarSuccess'
import ShopCar from '@/pages/ShopCar'


// 配置路由
export default new VueRouter({
    routes: [
        { path: '/home', component: Home, meta: { show: true } },
        { path: '/login', component: Login, meta: { show: false } },
        { path: '/register', component: Register, meta: { show: false } },
        { path: '/Search/:keyword?', component: Search, meta: { show: true }, name: 'search' },
        { path: '/detail/:skuId', component: Detail, meta: { show: true } },
        { path: '/addCarSuccess', component: AddCarSuccess, meta: { show: true },name:'AddCarSuccess' },
        { path: '/shopCar', component: ShopCar, meta: { show: true },name:'ShopCar' },
        { path: '/', redirect: '/home' }
    ],
    // eslint-disable-next-line no-unused-vars
    scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置
      return { y:0 };
    }
})


