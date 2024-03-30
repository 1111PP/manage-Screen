<script lang='ts' setup>
import { computed } from 'vue'
import setting from '@/setting'
const props = defineProps(["isCollapse"])
const isShowTitle = computed(() => props.isCollapse ? '' : setting.title)
</script>

<template>
    <div class="layout_slider_logo">
        <div class="viteLogo">
            <img class="viteLogo" src="../../../assets/icons/vite.svg" alt="">
        </div>
        <div class="text">{{ isShowTitle }}</div>
    </div>
</template>

<style scoped lang="scss">
.layout_slider_logo {
    padding: 10px;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    height: calc($base-tabbar-height - 20px);
    /* // border-bottom: .5px solid rgb(185, 183, 183); */

    .viteLogo {
        height: 40px;
    }

    .text {
        font-size: 18px;
        font-weight: 700;
        font-family: "黑体";
        padding-right: 10px;
    }
}
</style>