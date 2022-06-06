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


// 配置路由
export default new VueRouter({
    routes: [
        { path: '/home', component: Home, meta: { show: true } },
        { path: '/login', component: Login, meta: { show: false } },
        { path: '/register', component: Register, meta: { show: false } },
        { path: '/Search/:keyword?', component: Search, meta: { show: true }, name: 'search' },
        { path: '/detail/', component: Detail, meta: { show: true } },
        { path: '/', redirect: '/home' }
    ]
})


