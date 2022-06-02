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
        <Floor></Floor>
        <Floor></Floor>
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

    export default {
    name: "MyHome",
    components: { ListContainer, Recommend, Rank, Like, Floor, Brand }
}
</script>

<style lang="less" scoped>

</style>