// home模块小仓库

import {reqCategoryList} from '@/api';

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
    }
},

//准备mutations对象——修改state中的数据
mutations:{
    CATEGORYLIST(state,values){
        state.categoryList = values.slice(0,16);
    }
},

//准备state对象——保存具体的数据
state:{
    categoryList:[],
},

//准备getters对象——用于将state中的数据进行加工,类似于computed(计算属性)
getters:{},
}
