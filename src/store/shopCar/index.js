// shopCar模块小仓库

import { reqCarList } from "@/api";

export default {
    // 开启命名空间
    namespaced: true,

    //准备actions对象——响应组件中用户的动作、处理业务逻辑
    actions: {
        // 获取购物车列表数据
        async getCarList(context) {
            let result = await reqCarList()
            if (result.code === 200) {
                context.commit('GETGOODINFO', result.data);
            }
        },
    },

    //准备mutations对象——修改state中的数据
    mutations: {
        
    },

    //准备state对象——保存具体的数据
    state: {
        
    },

    //准备getters对象——用于将state中的数据进行加工,类似于computed(计算属性)
    // 简化仓库的数据
    getters: {

    },
}