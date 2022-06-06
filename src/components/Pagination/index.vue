<template>
    <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :current-page="currentPage"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>   
  <script>export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Pagination",

    props: ['pageSize','total','currentPage'],

    methods: {
        // 把点击改页面传给父组件
      handleCurrentChange(val) {
        this.$emit('handleCurrentChange',val)
      }
    },

}
</script>   
  <style lang="less" scoped>
.block {
    text-align: center;
}
</style>