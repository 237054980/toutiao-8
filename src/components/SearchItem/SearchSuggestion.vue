<template>
    <div class="search-suggestion">

        <van-cell
            icon="search"
            v-for="(str, index) in suggestions"
            :key="index"
            @click="$emit('search', str)"
        >
            <div slot="title" v-html="highlight(str)"></div>
        </van-cell>
    </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
export default {
    name:'SearchSuggestion',
    data(){
        return {
            suggestions: [] , //联想建议数据列表
            htmlStr:'Hello <span style="color:red">World</span>'
        }
    },
    props:{
        searchText:{
            type: String,
            required: true
        }
    },

    watch:{
        //属性名: 要監視的數據的名稱
        searchText: {
            //当数据发生变化是会执行 handler
            async handler () {
                //找到借口数据
                const { data } = await getSearchSuggestions(this.searchText)
                //console.log(data)
                this.suggestions = data.data.options
                //请求获取数据
                //模板绑定展示
                
            },
            //该回调在侦听开始时立刻调用
            immediate: true
            
        }
    },
    methods:{
        //  高 亮 处 理
    highlight (str) {
        return str.replace(
            new RegExp(this.searchText, 'gi'),
            `<span style="color:red">${this.searchText}</span>`
        )
    }
    }
}
</script>

<style lang="less" scoped>

</style>