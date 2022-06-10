// shopCar模块小仓库

import { reqCarList, reqDeleteCartById, reqUpdateCheckedId } from "@/api";

export default {
    // 开启命名空间
    namespaced: true,

    //准备actions对象——响应组件中用户的动作、处理业务逻辑
    actions: {
        // 获取购物车列表数据
        async getCarList(context) {
            let result = await reqCarList()
            if (result.code === 200) {
                context.commit('GETCARLIST', result.data);
            }
        },
        // 删除购物车某一个产品
        async deleteCartListBySkuId(context, skuId) {
            let result = await reqDeleteCartById(skuId);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 修改商品选中状态
        async updateCheckedById(context, { skuId, isChecked }) {
            let result = await reqUpdateCheckedId(skuId, isChecked);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'))
            }
        },

        //修改全部产品的状态
        updateAllCartIsChecked({ dispatch, state }, isChecked) {
            //数组
            let promiseAll = [];
            state.carList[0].cartInfoList.forEach((item) => {
                let promise = dispatch("updateCheckedById", {
                    skuId: item.skuId,
                    isChecked,
                });
                promiseAll.push(promise);
            });
            //最终返回结果
            return Promise.all(promiseAll);
        },

        //删除全部勾选的产品
        deleteAllCheckedCart(context) {
            //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
            //获取购物车中全部的产品（是一个数组）
            let PromiseAll = [];
            context.getters.carList.cartInfoList.forEach((item) => {
                let promise = item.isChecked == 1 ? context.dispatch("deleteCartListBySkuId", item.skuId) : "";
                //将每一次返回的Promise添加到数组当中
                PromiseAll.push(promise);
            });
            //只要全部的p1|p2....都成功，返回结果即为成功
            //如果有一个失败，返回即为失败结果
            return Promise.all(PromiseAll);
        },
    },

    //准备mutations对象——修改state中的数据
    mutations: {
        GETCARLIST(state, carList) {
            state.carList = carList
        }
    },

    //准备state对象——保存具体的数据
    state: {
        carList: []
    },

    //准备getters对象——用于将state中的数据进行加工,类似于computed(计算属性)
    // 简化仓库的数据
    getters: {
        carList(state) {
            return state.carList[0] || {}
        },
    },
}