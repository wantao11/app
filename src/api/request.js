// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
//引入进度条样式
import 'nprogress/nprogress.css'

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过可以稍微配置一下
const requests = axios.create({
    //配置对象

    // 配置路径，发请求的时候，路径当中会自动出现api
    baseURL:"/api",
    // 代表请求超时时间为5s
    timeout: 5000,
})

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
    //开启进度条
    nprogress.start();
    // config：配置对象，对象里有一个属性很重要， headers 请求头
    return config;
})

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
requests.interceptors.response.use(
    // 成功的回调函数：服务器相应数据回来以后，相应拦截器可以检测到，可以做一些事情
    (res) => {
        //响应成功，关闭进度条
        nprogress.done();
         return res.data
    },
    // 失败的回调函数,终止promise链
    (err) => {
        return Promise.reject(new err('faile'));
    })

// 对外暴露
export default requests;