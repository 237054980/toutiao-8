<template>
  <div class="home-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar">
      <van-button 
          slot="title" 
          class="search-btn" 
          icon="search" 
          type="info" 
          round 
          size="small"
          to="/search"
          >搜索</van-button>
    </van-nav-bar>
    <!--文章标签页列表-->
    <!--
        标签页组件的一个功能,只有你第一次查看标签页时
        才会渲染里面的内容
    -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab 
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
      <!--文章列表-->
      <article-list :channel="channel" />
      </van-tab>
      <!--汉堡按钮定位吧列表最后的位置挡住了,解决办法在这和位置添加个占位符-->
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div 
          slot="nav-right" 
          @click="isChannelEditShow = true"
          class="wap-nav-wrap" 
          >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup 
        v-model="isChannelEditShow" 
        position="bottom" 
        closeable
        class="channel-edit-popup"
        style="height: 100%"
        close-icon-position="top-left"
    >
      <!--模板中$event 表示事件参数-->
      <channel-edit 
        :user-channels="channels"
        :active = "active"
        @close="isChannelEditShow = false"
        @update-active=" active = $event" 
      /><!--onUpdateActive-->
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '../components/ArticleList'
import ChannelEdit from '../components/ChannelEdit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: "Home",
  components:{
      ArticleList,
      ChannelEdit
  },
  
  data() {
    return {
      active: 0,     //控制被激活的标签
      channels: [],   //频道列表
      isChannelEditShow: false //控制频道弹出显示
    }
  },
  computed:{
    ...mapState(['user'])
  },
  created(){
      this.losdChannels()
  },
  methods:{
      async losdChannels(){
        let channels = []
        if (this.user) {
          //已登录,请求获取线上用户频道列表数据
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          //未登录,判断是否有本地
          const localChannels = getItem('user-channels')
          //如果有本地存储的频道列表则使用
          if (localChannels) {
            channels = localChannels
          } else {
            //用户未登录也无本地存储,则使用默认推荐列表
            const { data } = await getUserChannels()
            channels = data.data.channels 
          }
        }
          //把处理好的数据放data 中以供模板使用
        this.channels = channels
          //请求获取频道数据
        //const { data } = await getUserChannels()
        //console.log(data)
        //this.channels = data.data.channels
      },


      //Home.vueonUpdateActive(index){
        //this.active = index
      //}
  }
}

</script>

<style lang="less" scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfd;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  .channel-tabs{
      /deep/.van-tab {
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
      }
      /deep/.van-tabs__line{
        bottom: 20px;
        width: 15px !important;
        height: 3px;
        background: #3296fa;

      }
  }
  .wap-nav-placeholder{
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap{
    position: fixed;
    right: 0;
    width: 33px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: .9;
    .van-icon{
      font-size: 22px;
    }
  }
}
</style>