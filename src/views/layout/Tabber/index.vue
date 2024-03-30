<script lang='ts' setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLayoutSettingStore } from '@/store/module/setting'
import { useUserData } from '@/store/module/user'
import { userLogoutAPI } from '@/api/user/index'
import { Sunny, Moon } from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter()
const userData = useUserData()
const emit = defineEmits(['changeCollapse'])
const changeIsCollapse = () => {
    emit('changeCollapse')
}
const layoutSettingStore = useLayoutSettingStore()
//点击刷新按钮，表示Main组件需要刷新，修改刷新的标志layoutSettingStore.isRefresh
const refreshMain = () => {
    layoutSettingStore.changeIsRefresh(true)
}

//全屏模式
const fullScreen = () => {
    // //DOM对象的一个属性：判断当前是不是全屏模式[全屏：true，不是全屏：false]
    if (!document.fullscreenElement) {
        //设置全屏模式
        document.documentElement.requestFullscreen()
    } else {
        //退出全屏
        document.exitFullscreen()
    }
}

//logout
const logOut = async () => {
    await userData.logout()

    //4.跳转回login
    router.push({
        path: '/login',
        query: {
            redirect: `${route.path}`
        }
    })
}

let isShowBreadcrumb = ref<boolean>(true)
//👇操作会在setup函数中执行，差不多是在vue2中的beforeCreate钩子执行，不过vue3移除了该钩子，setup相当于平替它，先于onMounted
isShowBreadcrumb.value = window.innerWidth >= 710 ? true : false

onMounted(() => {
    window.addEventListener('resize', () => {
        isShowBreadcrumb.value = window.innerWidth >= 710 ? true : false
    })
})

const themeColor = ref('rgba(255, 69, 0, 0.68)')
const darkSwitch = ref<boolean>(false)
//可供直接选择的颜色
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
const changeDark = () => {
    document.documentElement.className =
        darkSwitch.value ? 'dark' : ''
}
const changeTheme = () => {
    console.log(1);
}
const change = (value: string) => {
    console.log(value);
    themeColor.value = value

    // document.documentElement 是全局变量时
    const el = document.documentElement
    // const el = document.getElementById('xxx')

    // 获取 css 变量
    getComputedStyle(el).getPropertyValue(`--el-color-primary`)

    // 设置 css 变量
    el.style.setProperty('--el-color-primary', `${value}`)
}
</script>

<template>
    <!-- 顶部 -->
    <div class="tabber">
        <!-- 左侧面包屑 -->
        <div class="tabber_left">
            <!-- 展开/收起菜单栏图标 -->
            <div class="icon-isCollapse"></div>
            <el-icon>
                <Grid @click="changeIsCollapse" />
            </el-icon>
            <div class="breadcrumb">
                <!-- 左侧面包写 -->
                <el-breadcrumb separator=">">
                    <!-- route.matched可以获取到当前路由的层级嵌套关系，包括父组件 -->
                    <template v-for="item in route.matched" :key="item.path">
                        <el-breadcrumb-item v-if="item.meta.title && isShowBreadcrumb" :to="{ path: item.path }">
                            <el-icon style="margin:0 2px;        vertical-align:top;">
                                <component style="width:15px; height: 15px;" :is="item.meta.icon">
                                </component>
                            </el-icon>
                            <span> {{ item.meta.title }}</span>
                        </el-breadcrumb-item>
                    </template>
                </el-breadcrumb>
            </div>

        </div>
        <!-- 右侧设置信息、头像 -->
        <div class="tabber_right">
            <el-button @click="refreshMain" icon="Refresh" size="small" circle></el-button>
            <el-button @click="fullScreen" icon="FullScreen" size="small" circle></el-button>

            <el-popover placement="bottom" title="主题设置" :width="300" trigger="click">
                <el-form>
                    <el-form-item label="主题颜色:">
                        <el-color-picker @active-change="change" @change="changeTheme" v-model="themeColor" show-alpha
                            :predefine="predefineColors" />
                    </el-form-item>
                    <el-form-item label="暗黑模式:">
                        <el-switch v-model="darkSwitch" class="mt-2" inline-prompt :active-action-icon="Sunny"
                            :inactive-action-icon="Moon" @change="changeDark" />
                    </el-form-item>
                </el-form>
                <template #reference>
                    <el-button icon="Setting" size="small" circle>
                    </el-button>
                </template>
            </el-popover>

            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="userPhote" :src="userData.userInfo.avatar" alt="">
                    <span style="padding-left: 10px;">
                        {{ userData.userInfo.name }}</span>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logOut">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
</template>

<style scoped lang="scss">
.tabber {
    height: calc(100%);
    width: calc(100vw - $base-menu-width);
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    border-left: 2.5x solid rgb(167, 167, 167);
    box-shadow: 0 8px 6px -6px black;

    .tabber_left {
        // margin-left: 5vw;
        width: 50vw;
        height: 100%;
        display: flex;
        flex-flow: row;
        align-items: center;

        .icon-isCollapse {
            margin-left: 20px;
        }

        .breadcrumb {
            margin-left: 20px;
            width: 100%;
            display: flex;
        }
    }

    .tabber_right {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 3vw;


        .el-dropdown-link {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 2vw;

            .userPhote {
                width: 40px;
                height: 40px;
                border-radius: 20px;
            }
        }
    }

}
</style>