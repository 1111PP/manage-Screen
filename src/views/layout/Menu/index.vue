<script lang='ts' setup>
import { } from 'vue'
defineProps(["menuRoutes"])
//@ts-ignore
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const routeInfo = (path: string) => {
    console.log(path);
    router.push(path)
}
</script>
<script lang="ts" >
export default {
    name: 'Menu'
}
</script>
<template>
    <template v-for="(item, idx) in menuRoutes" :index="String(idx)">
        <!-- 1.不存在子路由的菜单直接生成 -->
        <el-menu-item @click="routeInfo(item.path)" v-if="!item.children && !item.meta.hidden" :index="item.path">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span> {{ item.meta.title }}
                </span>
            </template>
        </el-menu-item>
        <!-- 2.存在子路由但只有一个子路由，该菜单栏直接展示子路由信息 -->
        <el-menu-item @click="routeInfo(item.path)" v-if="item.children && item.children.length === 1 && !item.meta.hidden"
            :index="item.path">
            <el-icon>
                <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <template #title>
                <span> {{ item.children[0].meta.title }}
                </span>
            </template>
        </el-menu-item>
        <!-- 3.存在子路由的组件递归生成 -->
        <!-- 🟥搭好一套完整的结构，index唯一标识使用path -->
        <el-sub-menu v-if="item.children && item.children.length > 1 && !item.meta.hidden" :index="item.path">
            <!--菜单标题需要用template包裹生成,即点击可展开子菜单的那个标题 -->

            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuRoutes="item.children" />
        </el-sub-menu>

    </template>
</template>

<style scoped></style>