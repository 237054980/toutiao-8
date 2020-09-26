<template>
    <div class="search-history">
        <van-cell
            title="搜索歷史"
        >
            <div v-if="isDeleteShow">
                <!--prop 数据如果是引用类型(数组, 对象)可以修改
                这个修改指: user.name = 'jack'  , arr.push(123)
                但任何 prop 数据都不能重新赋值  
                如果你想重新赋值  只要让父组件自己修改-->
                <span @click="$emit('update-histories', [])">全部刪除</span>
                &nbsp;
                <span @click="isDeleteShow = false">完成</span>
            </div>
                <van-icon 
                    v-else 
                    name="delete" 
                    @click="isDeleteShow = true"
                />
        </van-cell>
        <van-cell
            :title="history"
            v-for="(history, index) in searchHistories"
            :key="index"
            @click="onDelete(history,index)"
        >
            <van-icon 
                name="close" 
                v-show="isDeleteShow"
            />
        </van-cell>
    </div>
</template>

<script>
import { setItem } from '@/utils/storage'
export default {
    name:'SearchHistory',
    props:{
        searchHistories:{
            type: Array,
            required: true
        }
    },
    data () {
        return {
            isDeleteShow: false  //删除的显示状态
        }
        
    },
    methods: {
        onDelete (history, index) {
            //如果删除状态,则删除
            if (this.isDeleteShow) {
                 this.searchHistories.splice(index,1)
                    //持久化
                    //本地持久化
                //setItem('search-histories' , this.searchHistories)
                    //线上持久化
                 return
            }
            //非删除状态,展示搜索结果
            this.$emit('search', history)
        }
    }
}
</script>

<style lang="less" scoped>

</style>