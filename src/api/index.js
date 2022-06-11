//当前模块，API进行统一管理，即对请求接口统一管理
import request from "./request";
import mockRequests from "./mockAjax"

//首页三级分类接口
//发请求：axios发送请求返回promise对象

// 请求三级分类数据
export const reqGetCategoryList = () => {
    return request({ url: "/product/getBaseCategoryList", method: "get" })
}

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor')

// 获取搜索模块数据           post请求需要参数
export const reqGetSearchInfo = (params) => request({ url: '/list', method: 'post', data: params })

// 获取商品详情信息的接口
export const reqGetGoodInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'get' })

// 将产品添加到购物车中（获取或更新某一个产品的个数）
export const reqAddOrUpdateShopCar = (skuId, skuNumber) => request({ url: `/cart/addToCart/${skuId}/${skuNumber}`, method: 'post' })

// 获取购物车列表数据接口
export const reqCarList = () => request({ url: '/cart/cartList', method: 'get' })

// 删除购物车商品
export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// 修改商品选中状态
export const reqUpdateCheckedId = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

// 获取验证码
export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method:'get'})

// 用户注册
export const reqUserRegister = (data) => request({ url: '/user/passport/register',data,method: 'post'})

// 登录
export const reqUserLogin = (data) => request({ url: '/user/passport/login', data,method:'post'})

// 获取用户信息
export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo',method:'get'})

// 退出登录
export const reqLogout = () => request({url:'/user/passport/logout',method:'get'})

// 获取用户地址
export const reqUserAddressInfo = ()=> request({ url: '/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取商品清单
export const reqOrderInfo = ()=> request({ url: '/order/auth/trade', method:'get'})

// 提交订单
export const reqSubmitOrder = (tradeNo,data) => request({ url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data:data,method:'post'})