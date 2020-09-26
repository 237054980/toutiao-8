<template>
    <div class="search">
        <!-- 搜索栏 -->
        <form action="/">
        <van-search 
            v-model="searchText" 
            placeholder="请输入搜索关键词" 
            show-action
            background="#4fc08d"
            @search="onSearch(searchText)"
            @cancel="$router.back()"
            @focus="isResultShow = false"
        />
        </form>
        <!-- /搜索栏 -->


         <!-- 搜索结果 -->
        <search-result 
            v-if="isResultShow"
            :search-text = "searchText"
        />
        <!-- /搜索结果 -->


        <!-- 联想建议 -->
        <search-suggestion  
            v-else-if="searchText"
            :search-text = "searchText"
            @search="onSearch"
            />
        <!-- /联想建议 -->

        <!-- 历史记录 -->
        <search-history 
            v-else
            :searchHistories="searchHistories"
            @search="onSearch"
            @update-histories="searchHistories = $event"
        />
        <!-- /历史记录 -->


       
    </div>
</template>

<script>
import SearchSuggestion from './SearchItem/SearchSuggestion'
import SearchHistory from './SearchItem/SearchHistory'
import SearchResult from './SearchItem/SearchResult'
import { setItem, getItem } from '@/utils/storage'
export default {
    name:'Search',
    components:{
        SearchSuggestion,
        SearchHistory,
        SearchResult
    },
    data(){
        return{
            searchText: '',    //搜索输入框的内容
            isResultShow: false,  // 控制搜索结果的显示状态
            searchHistories: getItem('search-histories') || [] //搜索历史
        }
    },
    watch: {
        //监视搜索历史变化 ,存储到本地存储
        searchHistories () {
            setItem('search-histories' , this.searchHistories)
        }
    },
    methods: {
        onSearch(searchText) {
            //把输入框设置为你要搜索的文本
            this.searchText = searchText

            const index = this.searchHistories.indexOf(searchText)

            if (index !== -1) {
                //把重复项删除
                this.searchHistories.splice(index,1)
            }
            //把最新搜索历史记录记录在最上方
            this.searchHistories.unshift(searchText)
            //数据持久化
            //setItem('search-histories', this.searchHistories)
            //展示搜索結果
            this.isResultShow = true
        },
        
  },
}
</script>

<style lang="less" scoped>

</style>