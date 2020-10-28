<template>
    <div class="update-gender">
        <van-picker
            show-toolbar
            :columns="columns"
            :default-index="defaultIndex"
            @cancel="$emit('close')"
            @confirm="onConfirm"
            @change="onGenderChange"
        />
    </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
    name:'UpdateGender',
    props:{
        value:{
            type: Number,
            required: true
           }
    },
    data(){
        return{
            columns: ['男', '女'],
            defaultIndex: this.value,

        }
    },
    methods: {
        onGenderChange (picker, value, index) {
            this.defaultIndex = index
        },
        async onConfirm(value) {
            this.$toast.loading({
                massage: '保存中',
                forbidclick: true    // 禁背景点击
            })
        
          try {
                await updateUserProfile({
            gender: this.defaultIndex
        })
            this.$emit('input' , this.defaultIndex)
            //this.$emit('update-name', this.localName)
            this.$emit('close')
            this.$toast.success('保存成功')
          } catch (error) {
              
              this.$emit('close')
          }
       
        },
  },
}
</script>

<style lang="less" scoped>

</style>