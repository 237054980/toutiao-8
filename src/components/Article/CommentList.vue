<template>
  <div class="commen-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <comment-item 
          v-for="(comment, index) in list" 
          :key="index" 
          :comment="comment"
          />

      <!--<van-cell 
            v-for="(comment, index) in list" 
            :key="index" 
            :title="comment.content" 
        />-->
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './CommentItem'
export default {
  name: "CommentList",
  components:{
      CommentItem
  },
  props:{
      source:{
          type: [Number, String, Object],
          required: true
      }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,  //获取下一页页码
      limit: 10   //每页10行
    }
  },
  methods: {
    async onLoad() {
      //1.请求获取数据
        const { data } = await getComments({
            type: 'a',
            source: this.source,
            offset: this.offset,
            limit: this.limit
        })
      //2.把数据放到列表
      const {results } = data.data
      this.list.push(...results)
      //3.将本次Loading关闭
      this.loading = false
      //判断是否还有数据
      if (results.length) {
          //如果有,更新获取下一页数据]
          this.offset = data.data.last_id
      } else {
          //  如果没有,则将finished 设置为true ,不在触发加载
          this.finished = true
      }
      
      
     
  }
 }
}
</script>

<style lang="less" scoped>
</style>
