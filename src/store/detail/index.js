// detail模块小仓库

import { reqGetGoodInfo } from "@/api"

export default {
    // 开启命名空间
    namespaced: true,

    //准备actions对象——响应组件中用户的动作、处理业务逻辑
    actions: {
        // 获取产品信息的数据
        async getGoodInfo(context, skuId) {
            //需要传递参数，至少一个空对象 
            let result = await reqGetGoodInfo(skuId)
            if (result.code === 200) {
                context.commit('GETGOODINFO', result.data);
            }
        }
    },

    //准备mutations对象——修改state中的数据
    mutations: {
        GETGOODINFO(state, values) {
            state.goodInfo = values
        }
    },

    //准备state对象——保存具体的数据
    state: {
        goodInfo:{}
    },

    //准备getters对象——用于将state中的数据进行加工,类似于computed(计算属性)
    // 简化仓库的数据
    getters: {
        // 导航栏数据
        categoryView(state){
            return state.goodInfo.categoryView || {}
        },
        // 放大镜，小图列表，产品介绍价，格等
        skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        // 产品售卖属性，参数
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList || []
        }
    },
}