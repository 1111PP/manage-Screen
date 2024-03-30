<script lang='ts' setup>
import { toRefs, ref } from 'vue'
import { type Ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useUserData } from '@/store/module/user'
import MenuList from './Menu/index.vue'
import itemLogo from './Logo/index.vue'
import itemMain from './Main/index.vue'
import itemTabber from './Tabber/index.vue'
const userData = useUserData()
const menuRoutes = userData.menuRoutes

// const menuRoutes = userData.userInfo.routes
const route = useRoute()
const isCollapse = ref<boolean>(false)
//点击tabber组件中的icon-Grib图标会折叠菜单栏
const handleCollapse = () => {
    isCollapse.value = !isCollapse.value
}
</script>

<template>
    <div class="layout_container">
        <!-- 左侧 -->
        <div class="layout_slider" :class="{ collapse: isCollapse }">
            <item-logo :isCollapse="isCollapse" />
            <!-- 左侧菜单栏部分 -->
            <!-- 左侧菜单滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 左侧菜单栏组件 -->
                <el-menu mode="vertical" :default-active="route.path" :collapse="isCollapse" :collapse-transition="true">
                    <!-- 根据路由信息动态生成 -->
                    <MenuList :menuRoutes="menuRoutes"></MenuList>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部 -->
        <div class="tabbar" :class="{ collapse: isCollapse }">
            <item-tabber @changeCollapse=handleCollapse></item-tabber>
        </div>
        <!-- 主体展示 -->
        <div class="layout_main" :class="{ collapse: isCollapse }">
            <item-main />
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout_container {
    position: absolute;
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        height: 100%;
        /* // padding: 10px; */
        // transition: all 0.5s;

        .scrollbar {
            widows: 100%;
            height: calc(100vh - $base-menu-logo-height);
        }

        //&表示父元素下的.collapse类
        // &.collapse {
        //     width: 60px;
        // }
    }



    .tabbar {
        position: absolute;
        top: 0;
        right: 0px;
        width: calc(100% - $base-menu-width);
        height: calc($base-tabbar-height - 1px);
        // border-bottom: 1px solid rgb(186, 186, 186, .5);
        transition: all .3s;

        &.collapse {
            width: calc(100vw - 60px);
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width - 40px);
        height: calc(100vh - $base-tabbar-height - 40px);
        padding: 20px;
        left: $base-menu-width;
        top: $base-tabbar-height;
        overflow: auto;
        transition: all .3s;


        &.collapse {
            width: calc(100vw - 100px);
            left: 60px;
        }
    }
}

:deep(.el-menu) {
    border: 0px
}
</style>