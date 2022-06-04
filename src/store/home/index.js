// home模块小仓库

import {reqCategoryList,reqGetBannerList} from '@/api';

export default{
    // 开启命名空间
    namespaced:true,

//准备actions对象——响应组件中用户的动作、处理业务逻辑
actions:{
    // 通过api里面的接口函数调用，向服务器发请求，获取数据
    async categoryList(context) {
        let result = await reqCategoryList();
        // console.log(result);
        // console.log(value);
        // console.log(context);
        if(result.code === 200){
            context.commit('CATEGORYLIST',result.data);
        }
    },

    // 获取轮播图数据
    async getBannersList(context){
      let result =  await reqGetBannerList();
      if(result.code === 200){
        context.commit('GRTBANNERSLIST',result.data);
    }
}
},

//准备mutations对象——修改state中的数据
mutations:{
    CATEGORYLIST(state,values){
        state.categoryList = values.slice(0,16);
    },
    GRTBANNERSLIST(state,values){
        state.bannersList = values
    }
},

//准备state对象——保存具体的数据
state:{
    categoryList:[],
    bannersList:[],
},

//准备getters对象——用于将state中的数据进行加工,类似于computed(计算属性)
getters:{},
}
