// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


// 使用插件
Vue.use(VueRouter)

// 引入路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCarSuccess from '@/pages/AddCarSuccess'
// import ShopCar from '@/pages/ShopCar'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// // 引入二级路由
// import myOrder from '@/pages/Center/myOrder'
// import groupOrder from '@/pages/Center/groupOrder'


// 配置路由
let router = new VueRouter({
    routes: [
        { path: '/home', component: () => import('@/pages/Home'), meta: { show: true } },
        { path: '/login', component: () => import('@/pages/Login'), meta: { show: false } },
        { path: '/register', component: () => import('@/pages/Register'), meta: { show: false } },
        { path: '/Search/:keyword?', component: () => import('@/pages/Search'), meta: { show: true }, name: 'search' },
        { path: '/detail/:skuId', component: () => import('@/pages/Detail'), meta: { show: true } },
        { path: '/addCarSuccess', component: () => import('@/pages/AddCarSuccess'), meta: { show: true }, name: 'AddCarSuccess' },
        { path: '/shopCar', component: () => import('@/pages/ShopCar'), meta: { show: true, flag: false }, name: 'ShopCar' },
        {
            path: '/trade', component: () => import('@/pages/Trade'), meta: { show: true },
            //路由独享首位
            beforeEnter: (to, from, next) => {
                if (from.path === '/shopCar' && from.meta.flag === true) {
                    from.meta.flag = false
                    next()
                } else {
                    // 停留在当前
                    next(false)
                }
            }
        },
        {
            path: '/pay', component: () => import('@/pages/Pay'), meta: { show: true },
            //路由独享首位
            beforeEnter: (to, from, next) => {
                if (from.path === '/trade') {
                    next()
                } else {
                    // 停留在当前
                    next(false)
                }
            }
        },
        {
            path: '/paysuccess', component: () => import('@/pages/PaySuccess'), meta: { show: true },
            //路由独享首位
            beforeEnter: (to, from, next) => {
                if (from.path === '/pay') {
                    next()
                } else {
                    // 停留在当前
                    next(false)
                }
            }
        },
        {
            path: '/center', component: () => import('@/pages/Center'), meta: { show: true },
            // 子路由
            children: [
                { path: 'myOrder', component: () => import('@/pages/Center/myOrder') },
                { path: 'groupOrder', component: () => import('@/pages/Center/groupOrder') },
                { path: '/center', redirect: '/center/myOrder' },
            ]
        },
        { path: '/', redirect: '/home' }
    ],
    // eslint-disable-next-line no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 };
    }
})

// 全局守卫
// 前置守卫
//设置全局导航前置守卫
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    //1、有token代表登录，全部页面放行
    if (token) {
        //1.1登陆了，不允许前往登录页
        if (to.path === '/login') {
            next('/')
        } else {
            //1.2、因为store中的token是通过localStorage获取的，token有存放在本地
            // 当页面刷新时，token不会消失，但是store中的其他数据会清空，
            // 所以不仅要判断token,还要判断用户信息

            //1.2.1、判断仓库中是否有用户信息，有放行，没有派发actions获取信息
            if (name)
                next()
            else {
                //1.2.2、如果没有用户信息，则派发actions获取用户信息
                try {
                    await store.dispatch('user/getUserInfo')
                    next()
                } catch (error) {
                    //1.2.3、获取用户信息失败，原因：token过期
                    //清除前后端token，跳转到登陆页面
                    await store.dispatch('user/logout')
                    next('/login')
                }
            }
        }
    }
    else {
        //2、未登录，首页或者登录页可以正常访问
        if (to.path === '/login' || to.path === '/home' || to.path === '/register')
            next()
        else {
            alert('请先登录')
            next('/login')
        }
    }
})






export default router
