<template>
    <div class="search-result">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell 
                v-for="(article,index) in list" 
                :key="index" 
                :title="article.title" 
            />
        </van-list>
    </div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
    name:'SearchResult',
    props:{
        searchText:{
            type: String,
            required: true
            
        }
    },
    data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
    perpage:10
    }
  },
  methods: {
      //1.请求获取数据
    async onLoad() {
        const { data } = await getSearchResult({
            page: this.page,   //页码
            per_page: this.perPage,  //每页大小
            q: this.searchText   //搜索关键字
        })
        //console.log(data)
        //2将数据放在数据列表中
        const { results } = data.data
        this.list.push(...results)
        //3.关闭本次loading
        this.loading = false
        //4.判断是否还有数据 
        if (results.length) {
            //如果有,则更新获取下一页数据页码
            this.page++
        } else {
            //如果没有
            //关闭加载更多
            this.finished = true
            
        }
    }   
  },
}
</script>

<style lang="less" scoped>

.search-result{
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
}
</style>