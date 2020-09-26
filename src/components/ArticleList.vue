<template>
    <div class="article-list">
        <van-pull-refresh 
            v-model="isRefreshLoading" 
            @refresh="onRefresh"
            success-text="刷新成功"
            :success-duration="1500"
        >
  
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <article-item 
                v-for="(article,index) in articles" 
                :key="index"
                :article= "article"
            />
            <!--<van-cell 
                v-for="(item,index) in articles" 
                :key="index" 
                :title="articles.title" 
            />-->
        </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import {getArticles} from '@/api/article'
import  ArticleItem  from './ArticleItem';
export default {
    name:'ArticleList',
    components:{
        ArticleItem
    },
    props:{
      channel:{
          type: Object,
          required: true
      }
  },
  data() {
    return {
      articles: [],
      loading: false, //控制加载中的loading状态
      finished: false, //控制加载结束的状态, 加载结束不再触发
      timestamp: null,   //获取下页时间戳
      isRefreshLoading: false ,  //下拉刷新的loadong状态
      refreshSuccessText: '' // 下拉刷新成功的提示文本
    }
  }, 
  methods: {
        async onLoad() {
        // 1.请求获取数据
        const { data } = await getArticles({
            channel_id: this.channel.id,
            timestamp: this.timestamp || Date.now(),  //获取最新时间戳
            with_top: 1
        })
        //console.log(data)
        //2.把数据放到 list 数组中
        const { results } = data.data
        this.articles.push(...results)
        // 3.设置本次加载状态结束,它才可以判断是否需要
                //加载下一次,否则就永远的停在这
        this.loading = false
        // 4.数据全部加载完成
        if (results.lenght) {
            //更新获取下一页的页码
            this.timestamp = data.data.pre_timestamp
            
        } else {
            //没有数据了,把加载状态设置结束,不再出发更多

            this.finished = true
            
        }
           
            },

        async onRefresh(){
            //下拉刷新,组件自己展示 loading 状态
            //1.请求数据
            const {data} = await getArticles({
                channel_id: this.channel.id,  //频道id
                timestamp:Date.now(),  //获取最新时间戳
                with_top: 1
        })
            //2.把数据放到数据列表中(往顶部追加)
            const { results } = data.data
            this.articles.unshift(...results)
            //3.关闭刷新的状态 loading
            this.isRefreshLoading = false
        }
    },


}
</script>

<style lang="less" scoped>
.article-list{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;


}

</style>