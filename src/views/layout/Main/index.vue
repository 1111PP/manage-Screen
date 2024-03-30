<script lang='ts' setup>
import { watch, ref, nextTick } from 'vue'
import { RouterView } from 'vue-router'
import { useLayoutSettingStore } from '@/store/module/setting'

//✨刷新功能
const layoutSettingStore = useLayoutSettingStore()
//watch监听仓库内部数是否发生变化，若发生，则说明点击刷新按钮
//需要配合v-if完成组件刷新（😂销毁重建），但是速度过快。所以加了延时器看出效果
watch(() => layoutSettingStore.isRefresh, () => {
    console.log(2);

    nextTick(() => {
        // console.log(2);
        setTimeout(() => {
            //false表示重新展示Main组件，即销毁后的重建
            layoutSettingStore.changeIsRefresh(false)
        }, 100)
    })
})  
</script>
<!-- 6.5+10+12+41 13+23+15 +33+13+21 -->
<template>
    <!-- vue-router中可以对路由切换做动画效果-->
    <!--此处为layout页面进入的二级路由应用名为fade的动画效果 -->
    <router-view v-if="!layoutSettingStore.isRefresh" v-slot="{ Component }">
        <!-- <transition name="fade"> -->
        <component :is="Component" />
        <!-- </transition> -->
    </router-view>
</template>

<style>
.fade-enter-from {
    /* opacity: 0 */
}

.fade-enter-active {
    /* transition: all 1s; */
}

.fade-enter-to {
    /* opacity: 1 */
}
</style>