<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useUserData } from '@/store/module/user'
import { storeToRefs } from 'pinia'
import { reqLoginAPI } from '@/api/user/index'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import { } from '@/api/user/type'
import { getTime } from '@/utils/time'
import { type loginInfo } from '@/api/user/type'

const route = useRoute()
const router = useRouter()
const userData = useUserData()
const form = reactive<loginInfo>({
    username: 'admin',
    password: '111111',
})
//2.准备规则对象
const rules = {
    username: [
        //采用自定义规则，validator属性的函数value就是自定义规则详情
        {
            trigger: 'change',
            validator: (rule: any, value: string, cb: Function) => {
                if (value.length >= 2 && value.length <= 10) cb()
                else cb(new Error('账号长度为2-10个字符'))
            }
        },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' }
    ],
}
// control按钮加载变量
const isLoading = ref<boolean>(false)
//✨必须选中el-form表单的引用
const loginForm = ref()
const login = async () => {
    //验证成功再发ajax
    loginForm.value.validate(async (valid: boolean) => {
        if (valid) {
            isLoading.value = true
            //用户登录按钮触发，携带用户账号密码
            const result = await reqLoginAPI(form)
            // console.log(result);
            if (result.code === 200) {
                userData.token = result.data
                localStorage.setItem('TOKEN', result.data)
                //ajax携带用户token获取用户信息
                userData.ReGetUserInfo()
                ElNotification({
                    type: 'success',
                    title: '欢迎回来',
                    message: getTime(),
                })
                //P49 13分，退出登录前记录当前path至route.path.redirect，再次登录时就可以直接跳转到原先path页面
                const redirectPath: string = (route.query.redirect as string)
                //如果没有redirectPath则登录正常跳转至首页
                router.push(redirectPath || '/home')
                isLoading.value = false//取消登录按钮的加载效果
            } else {
                ElMessage({
                    type: 'error',
                    message: '账号或密码错误',
                })
                setTimeout(() => isLoading.value = false, 1000)
            }
        }
    })
}
// console.log(route);

</script>

<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0">
            </el-col>
            <el-col :span="12" :xs="24">
                <el-form class="inputForm" ref="loginForm" :rules="rules" :model="form" label-width="auto"
                    style="max-width: 600px">
                    <h1>欢迎来到</h1>
                    <h2>商城运营管理系统</h2>
                    <el-form-item prop="username">
                        <el-input v-model="form.username" placeholder="account" :prefix-icon="User"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" style="margin:15px 0 30px 0">
                        <el-input v-model="form.password" placeholder="password" :prefix-icon="Lock" type="password"
                            show-password></el-input>
                    </el-form-item>
                    <el-button :loading="isLoading" class="login_btn" type="primary" @click="login()">login in</el-button>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>



<style scoped lang="scss">
.login_container {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .inputForm {
        display: flex;
        flex-flow: column;
        position: relative;
        width: 60%;
        top: 20vh;
        background-color: rgba(88, 88, 245, 0.5);
        /* 使用 RGBA 表示颜色，最后一个参数表示透明度 */
        border-radius: 30px;
        background-size: cover;
        padding: 40px;
        padding-bottom: 80px;
        margin-left: 5vw;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>
