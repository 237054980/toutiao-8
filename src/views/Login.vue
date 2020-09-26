<template>
    <div class="login-container">
        <van-nav-bar
            class="app-nav-bar"
            title="注册/登录"
            left-arrow
            @click-left="$router.back()"
        />
        <!--form表单验证-->
        <van-form 
            
            :show-error="false"
            :show-error-message="false"
            validate-first  
            ref="login-from"
            @submit="handleOnClick"
            @failed="onFailed"
        >
            <!--登录表单-->
                <van-field
                    v-model="user.mobuser"
                    class="iconfont"
                    icon-prefix="icon"
                    left-icon="shouji"
                    center
                    placeholder="请输入手机号"
                    name="mobile"
                    :rules="formRules.mobile"

                />
                <van-field
                    v-model="user.code"
                    clearable
                    class="iconfont"
                    icon-prefix="icon"
                    left-icon="yanzhengma"
                    center
                    placeholder="请输入验证码"
                    name="code"
                    :rules="formRules.code"
                >
                    <template #button>
                        <van-count-down 
                            v-if="isCountDownShow"
                            :time="1000 * 60" 
                            format=" ss s"
                            @finish="isCountDownShow = false"
                            />
                        <van-button 
                            v-else
                            class="send-but"
                            size="small" 
                            round
                            :loading="isSendSmsLoding"
                            @click.prevent="onSendSms"
                        >获取验证码
                        </van-button>
                    </template>
                </van-field>
                <!--登录按钮-->
                <div class="login-btu-wrap">
                    <van-button 
                        class="login-btu" 
                        type="info" 
                        block
                        
                    >登录</van-button>
                </div>
        </van-form>
        
        
    </div>
</template>

<script>
import  {login, sendSms} from '@/api/user'
import { Toast } from 'vant';
export default {
    name:'Login',
    data(){
        return{
            user:{
                mobile:'',  //手机号
                code:'',   //验证码
            },
            formRules:{
                mobile:[
                    { required: true, message: '请输入手机号' },
                    { pattern: /^1[3|5|7|8]\d{9}$/, message:'手机号格式错误' }
                    ],
                code:[
                    { required: true, message: '请输入验证码' },
                    { pattern: /^\d{6}$/, message:'验证码格式错误' }
                ]
            },

            isCountDownShow: false,  //控制倒计时和发送按钮的显示
            isSendSmsLoding: false,  //发送验证码按钮的Loading状态
        }
    },
    methods:{
       async handleOnClick(){
           Toast.loading({
                message: '登录中...',  //提示文本
                forbidClick: true,     //禁止背景点击
                duration: 0    //展示时长(ms)，值为 0 时，toast 不会消失
                });
            // 1.找到登陆接口
            //2.封装请求方法
            //3.请求调用登陆
           try {
                const { data } = await login(this.user)
            //4.处理响应结果
                //console.log(res)
                Toast.success('登录成功')

            //将后端返回的用户状态(token等数据) 放到Vuex 容器中
                this.$store.commit('setUser', data.data)
            //登录成功,跳转回原来页面
                this.$router.back()
           }catch(err){
               console.log(err)
               Toast.fail('登录失败,手机号或验证码不正确')
               this.$router.back()
           }
            
        },

        onFailed(error) {
            //console.log('验证失败',error)
            if (error.errors[0]) {
                Toast({
                    message: error.errors[0].message,  //提示消息
                    position: 'top'  //防止手机键盘太高看不到提示消息
                    })
            }
        },

        async onSendSms() {
            try {
                    //效验手机号码
                    //const validateRet = 
                await this.$refs['login-from'].validate('mobile')
                    //console.log(validateRet)
                    //验证通过,请求发送验证码
                    //const res =  
                this.isSendSmsLoding = true  //展示按钮的loading状态,
                                            //防止网络慢用户多次点击触发发送行为
                await sendSms(this.user.mobile)
                    //console.log(res)

                    //短信发出去了,隐藏发送按钮,显示倒计时
                this.isCountDownShow = true

                    //倒计时结束 > 隐藏倒计时  显示发送按钮(监视倒计时的finish 事件处理)
                
            } catch (error) {
            
                let message = ''
                if (error && error.response && error.response.status 
                === 429){
                    //发送短信错误的失败提示
                    message = '发送太频繁了,请稍后重试'
                } else if (error.name === 'mobile') {
                    //表单验证失败的错误提示
                    message = error.message
                } else {
                    //未知错误
                    message = '发送失败,请稍后重试'
                }

                //提示用户
                Toast({
                    message,  //提示消息
                    position: 'top'  //防止手机键盘太高看不到提示消息
                    })
                //console.log('验证失败',error)
            }
            
                    //无论发送验证码成功或失败都要关闭loading
                this.isSendSmsLoding = false
                    //验证通过 > 请求发送验证码 > 用户接受短信>
                //      输入验证码 > 请求登录
                    //  请求发送验证码 > 隐藏发送按钮 . 显示倒计时
                    
                    //this.$refs['login-from'].validate('mobile').then(
                        //data => {
                            //console.log(data)
                        //}
                    //)
        }
    }
    
}
</script>

<style lang="less" scoped>
.login-container{
    .send-but{
        width: 78px;
        height:26px;
    }
    .login-btu-wrap{
        padding: 26px 16px;
        .login-btu{
            
            background-color: #6db4fb;
            border: none;
            
            .van-button__text{
                font-size: 15px;
            }
        }
    }
   
}
</style>