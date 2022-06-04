<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container" @mouseleave="leaveShow">
            <h2 class="all" @mouseenter="enterShow" >全部商品分类</h2>
            <!-- 上导航栏 -->
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <!-- 商品三级种类 -->
            <div class="sort" v-show="show">
                <!-- 三级联动 -->
                <!-- 利用事件委派和编程式导航实现路由的跳转和传递参数 -->
                <div class="all-sort-list2" @click="goSearch">
                    <div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
                        <h3>
                            <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName
                            }}</a>
                        </h3>
                        <div class="item-list clearfix">
                            <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                                                c2.categoryName
                                        }}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                            <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{
                                                    c3.categoryName
                                            }}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'TypeNav',

    data() {
        return {
            show: true,
        }
    },

    // 组件挂载完毕，向服务器发请求
    mounted() {
        // 如果不是home组件，将商品分类隐藏
        if (this.$route.path != '/home') {
            this.show = false
        }
    },

    computed: {
        ...mapState('home', { categoryList: 'categoryList' }),
    },

    methods: {
        // 进行路由跳转
        goSearch(event) {
            // 获取所点击的元素
            let element = event.target
            //html中会把大写转为小写
            //获取目前鼠标点击标签的categoryname,category1id,category2id,category3id，
            // 通过四个属性是否存在来判断是否为a标签，以及属于哪一个等级的a标签
            // dataset可以获取节点的自定义属性和属性值

            let { categoryname, category1id, category2id, category3id } = element.dataset
            // console.log(element.dataset)

            //categoryname存在，表示为a标签
            if (categoryname) {
                // 整理路由跳转的参数
                let location = { name: 'search', }//跳转路由name  即location.name = 'search'
                let query = { categoryName: categoryname }//路由参数,结构赋值  即query.categoryName = categoryName

                //category1id一级a标签
                if (category1id) {
                    query.category1Id = category1id
                }
                else if (category2id) {
                    //category2id二级a标签
                    query.category2Id = category2id
                }
                else if (category3id) {
                    //category3id三级a标签
                    query.category3Id = category3id
                }
                // 如果有params参数，带进去
                location.params = this.$route.params;
                //整理完参数,给到请求的query参数里  query:{categoryName:'',category123id:''}
                location.query = query;
                //路由跳转  location{name:'search'}
                this.$router.push(location)
            }
        },
        // 鼠标移入，让三级分类栏显示
        enterShow() {
            this.show = true
        },
        // 鼠标移出隐藏三级分类栏,在search中可用
        leaveShow() {
            if (this.$route.path != '/home') {
                this.show = false
            }

        }
    },
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                        }
                    }
                }

                .item:hover {
                    background-color: rgb(153, 149, 149);
                }
            }
        }
    }
}
</style>