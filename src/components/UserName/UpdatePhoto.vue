<template>
    <div class="update-photo image">
        <img :src="image" ref="image" >
        <van-nav-bar 
            class="toolber"
            left-text="取消"
            right-text="完成"
            @click-left="$emit('close')"
            @click-right="onConfirm"
        />
    </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
    name:'UpdatePhoto',
    props:{
        file:{
           
            required: true
        }
    },
    data(){
        return{
            image: window.URL.createObjectURL(this.file),
            cropper: null
        }
    },
    mounted() {
        const image = this.$refs.image
        this.cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop(event) {
            
  },
});
    },
    methods:{
        getCroppedCanvas() {
            return new Promise( resolve => {
               this.cropper.getCroppedCanvas().toBlob((blob) =>{
                   resolve(blob)
               })
            })
        },
        async onConfirm() {
            this.$toast.loading({
                message: '保存中',
                forbidclick: true
            })
            const file = await this.getCroppedCanvas()
            const fd = new FormData()
            fd.append('photo', file)

            //const fd = new FormData()
            //fd.append('photo', this.file)
            await updateUserPhoto(fd) 

            this.$toast.success('保存成功')

            //更新父组件头像
            this.$emit('update-photo', window.URL.createObjectURL(file))

            this.$emit('close')
        }
    }
}
</script>

<style lang="less" scoped>
    .toolber{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;
    }
    /* Ensure the size of the image fit the container perfectly */
.image {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>