// trade模块小仓库

import {reqUserAddressInfo,reqOrderInfo} from '@/api'

export default {
    // 开启命名空间
    namespaced: true,

    //准备actions对象——响应组件中用户的动作、处理业务逻辑
    actions: {
        // 获取用户地址信息
        async getUserAddress({commit}){
            let result = await reqUserAddressInfo()
            if (result.code === 200) {
                commit('GETUSERADDRESS',result.data)
            }
        },
        // 获取商品清单
        async getOrderInfo({commit}){
            let result = await reqOrderInfo()
            if (result.code === 200) {
                commit('GETORDERINFO',result.data)
            }
        }
    },

    //准备mutations对象——修改state中的数据
    mutations: {
        GETUSERADDRESS(state,address){
            state.address = address
            state.address[0].isDefault = 1
        },
        GETORDERINFO(state,value){
            state.orderInfo = value
        }
    },

    //准备state对象——保存具体的数据
    state: {
        address:[],
        orderInfo:{}
    },

    //准备getters对象——用于将state中的数据进行加工,类似于computed(计算属性)
    // 简化仓库的数据
    getters: {
        
    },
}