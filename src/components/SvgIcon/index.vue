<template>
    <svg :style="{ width: width, height: height }">
        <use :xlink:href="totalIconName" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
const result = defineProps({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '',
    },
    //svg宽度
    width: {
        type: String,
        default: '16px',
    },
    //svg高度
    height: {
        type: String,
        default: '16px',
    },
})
//拼接完整的svg图标名，必须蛮足#icon-xxx格式
//定义接口resultType，使得
interface iconInfoType {
    name: string,
    color?: string,
    width?: string,
    height?: string
}
const { name } = toRefs<iconInfoType>(result)
const totalIconName: string = `#icon-${name.value}`

</script>

<style scoped></style>
