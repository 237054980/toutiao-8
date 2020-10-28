<template>
  <div class="article-content">
    <!--导航栏-->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏-->
    <div class="article-wrap">
            <h1 class="title">
                {{ article.title }}
            </h1>

            <van-cell center class="user-info">
                <div slot="title" class="name">{{ article.aut_name }}</div>
                <van-image
                class="avatar"
                slot="icon"
                round
                fit="cover"
                :src="article.aut_photo"
                />
                <div slot="label" class="pubdate">{{ article.pubdate }}</div>
                <van-button
                round
                class="follow-btn"
                :icon="article.is_followed ? '' : 'plus'"
                :type="article.is_followed ? 'default' : 'info'"
                size="small"
                >{{ article.is_followed ? "已关注" : "关注" }}</van-button
                >
            </van-cell>
            <div
                class="markdown-body"
                v-html="article.content"
                ref="article-content"
            ></div>
             <!--文章评论列表-->
            <comment-list :source="articleId"/>
    </div>

   
    <!--底部区域-->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon
        :color="article.is_collected ? 'orange' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? 'red' : '#777'"
        @click="onLike"
      />
      <van-icon name="share" color="#777"></van-icon>
    </div>
  </div>
</template>

<script>
import "./markdown.css";
import {
  getArticle,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike,
} from "@/api/article";
import { ImagePreview } from "vant";
import { addFollow, deleteFollow } from "@/api/user";
import CommentList from "./CommentList";
export default {
  name: "ArticleContent",
  //在组建中获取动态参数:
  //    方式一: this.$route.params.articleId
  //    方式二: props  传参
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  components: {
    CommentList,
  },
  data() {
    return {
      article: {}, //文章数据对象
      isFollowLoading: false, //关注用户按钮
      isCollectLoading: false, //收藏按钮状态哦
    };
  },
  created() {
    this.loadArticle();
  },
  methods: {
    async loadArticle() {
      const { data } = await getArticle(this.articleId);
      //console.log(data)
      this.article = data.data;

      //console.log(articleContent)
      //如果需要在修改数据之后马上操作被该数据影响的视图DOM
      //需要用this.$nextTick
      this.$nextTick(() => {
        this.handlePerviewImage();
      });
    },
    handlePerviewImage() {
      //获取文章DOM元素
      const articleContent = this.$refs["article-content"];
      //得到所有img 标签
      const imgs = articleContent.querySelectorAll("img");
      //console.log(imgs)
      const imgPaths = []; //手机所有图片的地址
      //循环 img列表, 给img注册点击事件
      imgs.forEach((img, index) => {
        imgPaths.push(img.src);
        img.onclick = function () {
          ImagePreview({
            images: imgPaths, //预览图片路径列表
            startPosition: index, //起始位置
          });
        };
      });
    },

    /*async onFollow () {
            this. isFollowLoading = true
            if(this.article.is_followed) {
                //已关注,取消关注
               await deleteFollow(this.article.aut_id)
               //this.aeticle.is_followed = falae
            } else {
                //没有关注, 则取消关注
               await addFollow(this.article.aut_id)
               //this.aeticle.is_followed = true
            }
            this.aeticle.is_followed = !this.aeticle.is_followed
            this. isFollowLoading = false
        }*/
    async onCollect() {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true,
      });
      if (this.article.is_collected) {
        //已收藏,取消收藏
        await deleteCollect(this.articleId);
      } else {
        //没有收藏, 则收藏
        await addCollect(this.articleId);
      }
      this.aeticle.is_collected = !this.aeticle.is_collected;

      this.$toast.success(`${this.aeticle.is_collected ? "" : "取消"}收藏成功`);
    },
    async onLike() {
      this.$toast.loading({
        message: "操作中...",
        forbidClick: true,
      });
      if (this.article.attitude === 1) {
        //已点赞,取消点赞
        await deleteLike(this.articleId);
        this.article.attitude = -1;
      } else {
        //没有点赞, 则点赞
        await addLike(this.articleId);
        this.article.attitude = 1;
      }

      this.$toast.success(
        `${this.aeticle.attitude === 1 ? "" : "取消"}点赞成功`
      );
    },
  },
};
</script>

<style lang="less" scoped>
.article-wrap{
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 40px;
    overflow-y: auto;
}

.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}
.user-info {
  .avatar {
    height: 35px;
    width: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
.article-bottom {
  height: 40px;
  width: 100%;
  background-color: saddlebrown;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .comment-btn {
    width: 40%;
    height: 24px;
  }
}
</style>