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


//关注用户
export const addFollow = userId => {
    return request({
        method:'POST',
        url:'/app/v1_0/user/followings',
        data:{
            target: userId
        }
    })
}


//取消关注
export const deleteFollow = userId => {
    return request({
        method:'DELETE',
        url:`/app/v1_0/user/followings/${userId}`
    })
}



//获取用户资料
export const getUserProfile = () => {
    return request({
        method:'GET',
        url:'/app/v1_0/user/profile',
        
    })
}

//修改用户昵称
export const updateUserProfile = data => {
    return request({
        method:'PATCH',
        url:'/app/v1_0/user/profile',
        data
    })
}

//修改用户头像
export const updateUserPhoto = data => {
    return request({
        method:'PATCH',
        url:'/app/v1_0/user/photo',
        data
    })
}