<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',

  components:{
    Header,Footer
  },
  
  mounted() {
     // 通知vuex发请求，获取数据，存在其home小仓库中
        this.$store.dispatch('home/categoryList')
  },
    

}
</script>

<style lang="less" scoped>

</style>