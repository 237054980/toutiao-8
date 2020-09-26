//用户请求模块



import request from '@/utils/request'

//非组件模块中获取 store 必须通过这种方式
//这里单独加载 store和在组件中 this.$store 一个东西
//import store from '@/store/'


//登录/注册

export const login = data => {
    return request({
        method:'POST',
        url:'/app/v1_0/authorizations',
        data
    })
}

//发送手机验证码

export const sendSms = mobile => {
    return request({
        method:'GET',
        url:`/app/v1_0/sms/codes/${mobile}`
        
    })
}

//获取用户登录信息
export const getCurrentUser = () => {
    return request({
        method:'GET',
        url:'/app/vi_0/user'
        //headers: {
            //Authorizations:`Bearer ${store.state.user.token}`
        //}
        
    })
}


//获取频道列表
export const getUserChannels = () => {
    return request({
        method:'GET',
        url:'/app/v1_0/user/channels'
    })
}