<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑，带有小x结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeBread">×</i></li>
            <!-- 搜索关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i
                @click="removeKeywordBread">×</i></li>
            <!-- 品牌的面包屑                                                         切割为数组取第二个 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removeTrademarkBread">×</i></li>
            <!-- 平台售卖属性面包屑 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{ attrValue.split(':')[1]
            }}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>

        <!--selector 选择的细节，过滤，筛选-->
        <SearchSelector @trademarkInfo='trademarkInfo' @attrInfo='attrInfo' />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
             <!-- 选择商品方式 -->
            <div class="navbar-inner filter">             
              <ul class="sui-nav">
                <!-- 这里isOne、isTwo、isAsc、isDesc是计算属性，如果不使用计算属性要在页面中写很长的代码-->
                <!-- 谁满足条件谁active，高亮 -->
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont"
                      :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转带参数params -->
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器，页 -->
          <Pagination 
          :currentPage="searchList.pageNo" 
          :pageSize='searchParams.pageSize' 
          :total='searchList.total'
          @handleCurrentChange='handleCurrentChange'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
import Pagination from '@/components/Pagination/index.vue'
export default {
  name: 'MySearch',

  components: {
    SearchSelector,Pagination
},

  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        category1Id: "",      //一级分类id
        category2Id: "",      //二级分类id
        category3Id: "",      //三级分类id
        categoryName: "",     //分类名称
        keyword: "",          //搜索关键字
        order: "1:desc",      //排序方式,默认综合|降序
        pageNo: 1,            //默认页码
        pageSize: 10,         //每页数量
        props: [],            //平台售卖属性
        trademark: ""         //品牌
      }
    }
  },

  //在组件挂在之前动态编辑searchParams的值，因为组件挂在之后会使用到searchParams
  beforeMount() {
    //Object.assign方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
    //Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象，即将后面两项中对前面一项可用的数据传递给它
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
    // console.log(this.searchParams)
  },

  //watch可以监听组件上的属性
  watch: {
    $route: {
      // eslint-disable-next-line no-unused-vars
      handler(newValue, oldValue) {
        // console.log(this.$route)
        //如果下一次搜索时只有params参数，拷贝后会发现searchParams会保留上一次的query参数
        //所以每次请求结束后将相应参数制空
        this.searchParams.category1Id = '';
        this.searchParams.category2Id = '';
        this.searchParams.category3Id = '';
        // 重新赋值
        Object.assign(this.searchParams, this.$route.query, this.$route.params)
        // 再次发起ajax请求
        this.getDate()

      },
    }
  },

  mounted() {
    this.getDate();
  },

  methods: {
    getDate() {
      this.$store.dispatch('search/getSearchList', this.searchParams)
    },
    //删除面包屑分类
    removeBread() {
      // 属性为空还是会带给服务器，为undefined则不会带过去，减小服务器压力
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getDate();
      // 地址栏也需要改：进行路由操作,跳转到默认search页面
      // 如果存在params参数，带进去
      if (this.$route.params) {    //if永远成立，为空返回也是true
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    //删除搜索关键字的面包屑
    removeKeywordBread() {
      this.searchParams.keyword = undefined
      // 再次发请求
      this.getDate();
      //通知兄弟组件header删除输入框的keyword关键字
      this.$bus.$emit("clear")
      // 地址栏改变，若有query参数则带上，没有则带上空
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    // 自定义事件回调,自选品牌信息面包屑
    trademarkInfo(trademark) {
      // ID:品牌名称
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getDate()
    },
    // 删除品牌面包屑
    removeTrademarkBread() {
      this.searchParams.trademark = undefined
      this.getDate()
    },
    //获取子组件传递的属性信息面包屑（自定义事件）
    attrInfo(attr, attrValue) {
      //searchParams.props元素为字符串形式，商品属性的数组: ["属性ID:属性值:属性名"]
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      //数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
        this.getDate()
      }
    },
    //删除属性面包屑
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      this.getDate()
    },
    //排序操作，flag用于区分综合、价格，   1：综合，2：价格
    changeOrder(flag) {
      let originOrder = this.searchParams.order  //获取初始order值 1:desc
      let originFlag = this.searchParams.order.split(':')[0]; //获取初始flag值 1 
      let originSort = this.searchParams.order.split(':')[1]; //获取初始排序值 desc
      // 如果点综合(同一个按钮),则改变排序方式
      if (flag == originFlag) {
        originOrder = `${flag}:${originSort === 'desc' ? 'asc' : 'desc'}`
      }
      //点击的不是同一个按钮,切换到另一种排序的降序
      else if (flag !== originFlag) {
        originOrder = `${flag}:desc`
      }
      //需要给order重新赋值
      this.searchParams.order = originOrder
      //再次发请求
      this.getDate()
    },
    //点击修改当前页面 
    handleCurrentChange(val){
        this.searchParams.pageNo = val
        this.getDate()
    }
  },

  computed: {
    ...mapState('search', { searchList: 'searchList' }),
    ...mapGetters('search', ['goodsList']),
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
  }

}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>