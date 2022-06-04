//当前模块，API进行统一管理，即对请求接口统一管理
import requests from "./request";
import mockRequests from "./mockAjax"

//首页三级分类接口
    //发请求：axios发送请求返回promise对象
export const  reqCategoryList = () => {
    return requests({url: "/product/getBaseCategoryList", method: "get"})
}

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banners')