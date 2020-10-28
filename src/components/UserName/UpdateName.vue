<template>
    <div class="update-name">
        <van-nav-bar
            title="修改昵称"
            left-text="取消"
            right-text="完成"
            @click-left="$emit('close')"
            @click-right="onClickRight"
        />
        <div class="name-field-wrap">
            <van-field
            v-model="localName"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
        />
        </div>
    </div>

</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
    name: 'UpdateName',
    props:{
        name:{
            type: String,
            required: true
        }
    },
    data(){
        return{
            localName: this.name
        }
    },
    methods: {
        async onClickRight() {
            this.$toast.loading({
                massage: '保存中',
                forbidclick: true    // 禁背景点击
            })
        try {
            await updateUserProfile({
            name: this.localName
        })
        this.$toast.success('保存成功')
        this.$emit('update-name', this.localName)
        this.$emit('close')
        
        } catch (err) {
            if (err && err.response && err.response.status
            === 409) {
                this.$toast.fail('昵称已存在')
            }
        }
        }
  },
}
</script>

<style lang="less" scoped>
.name-field-wrap{
    padding: 10px;
}
</style>