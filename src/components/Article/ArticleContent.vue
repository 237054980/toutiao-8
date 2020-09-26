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
        <h1 class="title"> 
            牛逼的程序员都在用开元工具,你知道几个?????</h1>
        
        <van-cell center class="user-info">
            <div slot="title" class="name">天涯小行课</div>
            <van-image 
                class="avatar"
                slot="icon"
                round
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg" 
            />
            <div slot="label" class="pubdate">44444</div>
            <van-button 
                round
                class="follow-btn"
                icon="plus"
                type="info"
                size="small"
            >关注</van-button>
        </van-cell>
        <div class="markdown-body">
            <p>hello </p>
            <p>world</p>
        </div>
    </div>
</template>

<script>
import './markdown.css'
import {getArticle} from '@/api/article'
export default {
    name: 'ArticleContent',
    //在组建中获取动态参数:
    //    方式一: this.$route.params.articleId
    //    方式二: props  传参
    props:{
        articleId:{
            type: [String, Number, Object],
            required: true
        }
    },
    created(){
        this.loadArticle()
    },
    methods:{
        async loadArticle(){
            const { data } = await getArticle(this.articleId)
            console.log(data)
        }
    }
}
</script>

<style lang="less" scoped>

.title{
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
}
.user-info{
    .avatar{
        height: 35px;
        width: 35px;
        margin-right: 8px;
    }
    .name{
        font-size: 12px;
        color: #333333;
    }
    .pubdate{
        font-size: 11px;
        color: #b4b4b4;
    }
    .follow-btn{
        width: 85px;
        height: 29px;
    }
}
.markdown-body{
    padding: 14px;
    background-color: #fff;
}
</style>