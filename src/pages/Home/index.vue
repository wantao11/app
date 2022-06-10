<template>
    <div>
        <!-- 引入三级联动全局组件，因为是全局组件，所以不需要import -->
        <!-- 列表种类 -->
        <TypeNav></TypeNav>
        <!-- 轮播图 -->
        <ListContainer></ListContainer>
        <!-- --今日推荐-- -->
        <Recommend></Recommend>
        <!-- 商品排行 -->
        <Rank></Rank>
        <!-- 猜你喜欢 -->
        <Like></Like>
        <!-- 楼层 -->
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor> 
        <!-- 商标品牌 -->
        <Brand></Brand>
    </div>
</template>

<script>

import ListContainer from '@/pages/Home/ListContainer'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'

import {mapState} from 'vuex'

    export default {
    name: "MyHome",
    components: { ListContainer, Recommend, Rank, Like, Floor, Brand },

    mounted() {
        // 派发action，获取floor组件的数据
        this.$store.dispatch('home/getFloorList')
        // 获取用户信息在首页展示
        this.$store.dispatch('user/getUserInfo')
    },

    computed: {
        ...mapState('home',{floorList:'floorList'})
    },
}
</script>

<style lang="less" scoped>

</style>