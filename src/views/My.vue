<template>
  <div class="my-container">
    <van-cell-group class="my-info">
      <van-cell class="base-info" title="单元格" value="内容" center :border="false">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="name" slot="title">昵称</div>
        <van-button 
            class="update-btn" 
            size="small" 
            round
            to="/user/profile"
        >编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wap" slot="text">
            <div class="count">123</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wap" slot="text">
            <div class="count">123</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wap" slot="text">
            <div class="count">123</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wap" slot="text">
            <div class="count">123</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="iconfont icon" icon="3lishi" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to />
    <van-cell title="小智同学" is-link to class="mb-4" @click="$router.push('/user/chat')" />
      
    

    <van-cell class="logout-cell" title="退出" @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCurrentUser } from '@/api/user'

export default {
  name: "My",
 
  data() {
    return {
      currentUser: {}  //当前用户登录信息
    };
  },
  
  computed: {
    ...mapState(["user"]),
  },
  created(){
      this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser(){
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    },

    onLogout() {
      //提示用户确认退出
      //确认 -> 处理退出
      this.$dialog.confirm({
        title: "退出提示",
        message: "确认退出吗?",
      })
        .then(() => { //确认执行这里
            //清除用户登录状态
            this.$store.commit('setUser', null)
            this.$router.push({ path:'/login'})
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url("https://img.yzcdn.cn/vant/cat.jpeg") no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        font-size: 15px;
        color: #fff;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .text-wap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }

    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  /deep/.nav-grid {
    .nav-grid-item {
      height: 70px;
      .van-grid-item__content {
        font-size: 22px;
      }
      .van-icon-star-o {
        color: #eb5253;
      }
      .icon-3lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>