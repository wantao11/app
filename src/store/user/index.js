// 登录和注册模块小仓库

import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout, } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";

export default {
    // 开启命名空间
    namespaced: true,

    //准备actions对象——响应组件中用户的动作、处理业务逻辑
    actions: {
        // 获取验证码
        async getCode(context, phone) {
            let result = await reqGetCode(phone)
            if (result.code === 200) {
                context.commit('GETCODE', result.data);
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //用户注册
        async userRegister(context, user) {
            let result = await reqUserRegister(user);
            if (result.code == 200) {
                return "ok";
            } else {
                return Promise.reject(new Error("faile"));
            }
        },
        //登录业务
        async userLogin({ commit }, data) {
            let result = await reqUserLogin(data);
            //服务器下发token，用户唯一标识符(uuid)
            //将来经常通过带token找服务器要用户信息进行展示
            if (result.code == 200) {
                //用户已经登录成功且获取到token
                commit("USERLOGIN", result.data.token);
                //持久化存储token
                setToken(result.data.token);
                return "ok";
            } else {
                return Promise.reject(new Error("faile"));
            }
        },
        //获取用户信息
        async getUserInfo({ commit }) {
            let result = await reqUserInfo();
            if (result.code == 200) {
                //提交用户信息
                commit("GETUSERINFO", result.data);
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'));
            }
        },
        //退出登录
        async userLogout({ commit }) {
            //只是向服务器发起一次请求，通知服务器清除token
            let result = await reqLogout();
            //action里面不能操作state，提交mutation修改state
            if (result.code == 200) {
                commit("CLEAR");
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'));
            }
        },
    },

    //准备mutations对象——修改state中的数据
    mutations: {
        GETCODE(state, code) {
            state.code = code;
        },
        USERLOGIN(state, token) {
            state.token = token;
        },
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo;
        },
        //清除本地数据
        CLEAR(state) {
            //帮仓库中先关用户信息清空
            state.token = '';
            state.userInfo = {};
            //本地存储数据清空
            removeToken();
        }
    },

    //准备state对象——保存具体的数据
    state: {
        code: "",
        token: getToken(),
        userInfo: {},
    },

    //准备getters对象——用于将state中的数据进行加工,类似于computed(计算属性)
    getters: {},
}
