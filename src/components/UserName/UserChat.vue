<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <div
        class="message-item"
        :class="{ reverse: item.isMe }"
        v-for="(item, index) in messages"
        :key="index"
      >
        <van-image class="avatar" round fit="cover" :src="item.photo" />
        <div class="msg-wrap" style="flex: 1">
          <div class="title">{{item.message}}</div>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field v-model.trim="message" center clearable>
        <van-button slot="button" size="small" type="primary" @click="onSend"
          >发送</van-button
        >
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: "UserChat",
  data() {
      return{
          message: '',
          socket: null,
          messages: getItem('chat-messages') || []
      }
  },
  watch: {
    messages (newValue) {
      setItem('chat-messages', newValue)

      //让消息列表滚动到底部
      this.$nextTick(() => {
           this.toBottom()
      })
      //this.toBottom()
    }

  },
  created() {
      //建立 WebSocket 连接
      const socket = io('http://ttapi.reseach.itcast.cn')
      this.socket = socket

      socket.on('connect', function(){
          
      })
        //发送消息

      //接受消息
      socket.on('message', message => {
          this.message.push(message)
      })
  },
  methods: {
      onSend () {
          const message = this.message
          if (!message.length) {
              return
          } 
          //消息类型和文本格式按要求来
          const data = {
              msg: message,
              timestamp: Date.now(),
              isMy: true   
          } 
           this.socket.emit('message', {
               msg: message,
               timestamp: Date.now()
           })
           //将消息存在列表中

           this.messages.push({
               message,
               isMe: true,
              photo: 'https://img.yzcdn.cn/vant/cat.jpeg'
             
           })

          //清空文本框
          this.message = ''
      },
    toBottom () {
        const messageList = this.$refs['message-list']
        messageList.scrollTop = messageList.scrollHeight
  }
  }
};
</script>

<style lang="less" scoped>

.user-chat {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 46px 0 50px 0;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: #f5f5f6;
  .message-list {
    height: 100%;
    overflow-y: scroll;
    .message-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;
      padding: 10px;
      .msg-wrap {
        word-break: break-all;
        word-wrap: break-word;
      }
      .title {
        display: table;
        background: #e0effb;
        border-radius: 6px;
        font-size: 14px;
        padding: 10px 10px;
        margin-right: 45px;
      }
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 5px;
      }
    }
    .reverse {
      flex-direction: row-reverse; //翻转
      .msg-wrap {
        display: flex;
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
          margin-left: 45px;
        }
      }
    }
  }

  .send-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f5f5f6 !important;
  }
}
</style>