import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
//svg图标导入
import 'virtual:svg-icons-register'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import gloablComponents from '@/components/index.ts'
//引入sass全局样式文件
import '@/styles/index.scss'

//引入Element-Plus提供的暗黑模式功能的必要样式
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/dark/css-vars.css'

import router from './router/index.ts'
import pinia from '@/store/index.ts'
//引入路由鉴权文件
import './permisstion'
//全局自定义指令
import vHas from '@/directive/has'
const app = createApp(App)
//注册全局指令v-has
vHas(app)
app.use(ElementPlus, {
  locale: zhCn, //el-Plus国际化配置，主题语言配置
})
// console.log(import.meta.env);//全局变量.env文件中的变量

app.use(router)
app.use(pinia)
app.use(gloablComponents)

app.mount('#app')
