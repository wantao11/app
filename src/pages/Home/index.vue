<template>
    <div>
        <!-- 引入三级联动全局组件，因为是全局组件，所以不需要import -->
        <TypeNav></TypeNav>

        <ListContainer></ListContainer>
    </div>
</template>

<script>

import ListContainer from '@/pages/Home/ListContainer'

    export default {
    name: "MyHome",
    components: { ListContainer, }
}
</script>

<style lang="less" scoped>

</style>