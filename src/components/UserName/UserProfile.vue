<template>
    <div class="user-profile">
        <van-nav-bar
            class="app-nav-bar"
            title="个人信息"
            left-arrow
            @click-left="$router.back()"
        />
        <input 
            type="file" 
            hidden 
            ref="file"
            accept="image/*"
            @change="onFileChange"
        >
        <van-cell 
            title="头像" 
            is-link 
            center
            @click="$refs.file.click()"
        >
            <van-image 
                width="30" 
                height="30" 
                src="https://img.yzcdn.cn/vant/cat.jpeg" 
                round
                fit="cover"
            />
        </van-cell>
        <van-cell 
            title="昵称" 
            is-link 
            value="hello" 
            @click="isEditNameShow = true "
        />
        <van-cell 
            title="性别" 
            is-link 
            value="男" 
            @click="isEditGenderShow = true "/>
        <van-cell 
            title="生日" 
            is-link 
            value="2020-10-01" 
            @click="isEditBirthdayShow = true "
        />
        <!--修改昵称-->
        <van-popup 
            v-model="isEditNameShow" 
            position="bottom" 
            :style="{ height: '100%' }" 
        >
        
            <update-name 
                v-if="isEditNameShow"
                @close="isEditNameShow = false"
                name="hello"
                @update-name="name = $event"
            />
        </van-popup>
        <!--修改性别-->
        <van-popup 
            v-model="isEditGenderShow" 
            position="bottom"    
        >
        <update-gender 
            v-model="user.gender"
            @close="isEditGenderShow = false"
            />
        </van-popup>
        <!--修改生日-->
        <van-popup 
            v-model="isEditBirthdayShow" 
            position="bottom"    
        >
        <update-birthday 
            v-model="user.birthday"
            @close="isEditBirthdayShow = false"
            />
        </van-popup>
        <!--修改头像-->
        <van-popup 
            class="update-photo"
            v-model="isEditPhotoShow" 
            position="bottom"  
            :style="{ height: '100%' }"   
        >
        
           <update-photo 
                v-if="isEditPhotoShow"
                :file="previewImage"
                @close="isEditPhotoShow = false"
                @update-photo="user.photo = $event"
                />
        </van-popup>
    </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './UpdateName'
import UpdateGender from './UpdateGender'
import UpdateBirthday from './UpdateBirthday'
import UpdatePhoto from './UpdatePhoto'
export default {
    name:'UserProfile',
    components:{
        UpdateName,
        UpdateGender,
        UpdateBirthday,
        UpdatePhoto
    },
    data(){
        return{
            user: {},   //用户数据
            isEditNameShow: false ,//名称弹出层
            isEditGenderShow: false,   //编辑性别的显示状态
            isEditBirthdayShow:false,    //编辑生日
            isEditPhotoShow:false,   //编辑头像的显示状态
            previewImage: null   //上传预览图片

        }
    },
    created(){
        this.losdUserProfile()
    },
    methods:{
        async losdUserProfile () {
            const {data} = await getUserProfile()
            this.user = data.data
        },
        onFileChange() {
            //展示弹出层
            this.isEditPhotoShow = true

            const file = this.$refs.file.files[0]
            //const blob = window.URL.createObjectURL(this.$refs.file
            //.files[0])
            this.previewImage = file

            //为了解决相同文件不触发change事件
            //手动清空 file的value
            this.$refs.file.value = ''
        }
    }
}
</script>

<style lang="less" scoped>
.van-popup{
    background-color: #f5f7f9;
}
.update-photo{
    background-color: #000;
}
</style>