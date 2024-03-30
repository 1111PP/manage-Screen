import router from '@/router/index'
//进度条插件
import NProgress from 'nprogress'
//进度条插件样式
import 'nprogress/nprogress.css'
//
import setting from '@/setting'
//进度条右上角转圈圈效果取消
NProgress.configure({ showSpinner: false })

//获取用户数据---token判断用户是否登录成功
import pinia from './store/index'
import { useUserData } from './store/module/user'
// /组件外部若使用pania中数据，必须导入pinia这个大仓库
const userData = useUserData(pinia)

//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = ` ${to.meta.title} | ${setting.title}`
  //进度条开始
  NProgress.start()
  //每次路由跳转都要取到token看看是否有用
  let token = localStorage.getItem('TOKEN')
  //用于👇方判断有无用户信息
  let username = userData.userInfo.name
  //   console.log(token)
  //对用户是否登录（✨即有无token）进行处理
  if (token) {
    // console.log('has token')
    //登录成功无法跳转登录页了，直接响应/home路由
    if (to.path === '/login') next('/home')
    else {
      //根据username来间接判断pinia中的userData中用户数据是否还存在,如果刷新页面它pinia数据就会消失，🟥这个判断即代表正常的用户路由跳转，直接放行
      if (username !== '') {
        next()
      } else {
        try {
          //tabbat->8笔记：防止刷新丢失用户信息，重新发送ajax获取用户信息
          console.log('ReGetUserInfo,重新获取用户信息')
          //若请求失败则会被catch捕获，这是token过期现象
          await userData.ReGetUserInfo()
          console.log('to', to)

          //解决动态路由没有及时注册就跳转问题，出现空白页面问题❌
          next({ ...to, replace: true })
        } catch (e) {
          //如果ajax请求用户数据的操作失败，说明token过期了，因为请求需要携带用户的token,token过期则需要清空用户数据，并跳转至login
          //等待userData.logout()中异步操作执行完毕再跳转
          await userData.logout()
          //query参数？退出登录第3点功能
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      // await ReGetUserInfo()
      next()
      // await ReGetUserInfo()
    } else {
      // await ReGetUserInfo()
      //query参数？退出登录第3点功能
      next({ path: '/login', query: { redirect: to.path } })
    }
    console.log('ReGetUserInfo')
  }
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
  //进度条结束
  NProgress.done()
})
