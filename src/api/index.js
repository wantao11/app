//当前模块，API进行统一管理，即对请求接口统一管理
import request from "./request";
import mockRequests from "./mockAjax"

//首页三级分类接口
    //发请求：axios发送请求返回promise对象

// 请求三级分类数据
export const  reqGetCategoryList = () => {
    return request({url: "/product/getBaseCategoryList", method: "get"})
}

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqGetFloorList = () =>mockRequests.get('/floor')

// 获取搜索模块数据           post请求需要参数
export const reqGetSearchInfo = (params) => request({url:'/list',method:'post',data:params})

// 获取商品详情信息的接口
export const reqGetGoodInfo  = (skuId) => request({url:`/item/${skuId}`,method:'get' })
