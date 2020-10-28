<template>
    <div class="update-birthday">
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="$emit('close')"
        />
    </div>
</template>

<script>
export default {
    name:'UpdateBirthday',
    props:{

    },
    data(){
        return{
            minDate: new Date(1990, 0, 1),
            maxDate: new Date(2020, 10, 1),
            currentDate: new Date(),
        }
    },

}
</script>

<style lang="less" scoped>

</style>