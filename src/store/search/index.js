// search模块小仓库

import { reqGetSearchInfo } from "@/api"

export default {
    // 开启命名空间
    namespaced: true,

    //准备actions对象——响应组件中用户的动作、处理业务逻辑
    actions: {
        // 获取search模块数据
        async getSearchList(context, params={}) {
            //需要传递参数，至少一个空对象 
            let result = await reqGetSearchInfo(params)
            if (result.code === 200) {
                context.commit('CATSEARCHLIST', result.data);
            }
        }
    },

    //准备mutations对象——修改state中的数据
    mutations: {
        CATSEARCHLIST(state,values){
            state.searchList = values
        }
    },

    //准备state对象——保存具体的数据
    state: {
        searchList:[]
    },

    //准备getters对象——用于将state中的数据进行加工,类似于computed(计算属性)
    // 简化仓库的数据
    getters: {
        goodsList(state){
            //网络出现故障时应该将返回值设置为空
            return state.searchList.goodsList||[]
        },
        trademarkList(state){
            //网络出现故障时应该将返回值设置为空
            return state.searchList.trademarkList||[]
        },
        attrsList(state){
            //网络出现故障时应该将返回值设置为空
            return state.searchList.attrsList||[]
        }
    },
}