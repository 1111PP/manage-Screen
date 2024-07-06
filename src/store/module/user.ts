import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { type userInfoType } from '@/api/user/type'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import type { RouteRecordRaw } from 'vue-router'
import { getUserInfoApi, userLogoutAPI } from '@/api/user/index'
import { ifError } from 'assert'
import { useRouter } from 'vue-router'
//引入路由实例对象
import router from '@/router/index.ts'
//引入深拷贝方法
import cloneDeep from 'lodash/cloneDeep'
import { log } from 'console'
export const useUserData = defineStore('userData', () => {
  const token = ref<string>(String(localStorage.getItem('TOKEN')))
  const menuRoutes = ref<RouteRecordRaw[]>([])
  const btnRoutes = ref<string[]>([])
  const userInfo = reactive<userInfoType>({
    routes: [],
    buttons: [''],
    roles: [''],
    name: '',
    avatar: '',
  })
  //设置userInfo用户数据
  const setUserInfo = (data: userInfoType) => {
    //这样修改reactive定义的响应式对象userInfo不会让userInfo失去响应式
    Object.assign(userInfo, data)
    // console.log(data.routes)
  }
  //清空userInfo用户数据
  const clearUserInfo = () => {
    Object.assign(userInfo, {
      routes: [''],
      buttons: [''],
      roles: [''],
      name: '',
      avatar: '',
    })
  }

  //🟥筛选用户所拥有的异步路由
  const filterAsyncRoute = (arr: any, routes: string[]) => {
    return arr.filter((item: any) => {
      if (routes.includes(item.name)) {
        if (item.children && item.children.length !== 0) {
          item.children = filterAsyncRoute(item.children, routes)
        }
        return true
      }
    })
  }

  //获取用户数据并存储至pinia中，如果失败则返回失败状态Promise对象，用于👇方try和catch捕获
  const ReGetUserInfo = async () => {
    const { code, data } = await getUserInfoApi()
    if (code === 200 && data) {
      setUserInfo(data)
      //存储用户所拥有的按钮权限数据
      btnRoutes.value = data.buttons

      //异步路由筛选
      // const constantRoute

      let hasAsyncRoute: any = []
      //从所有异步路由asyncRoute中筛选出用户所拥有的异步路由,但是不能修改异步路由这个原数据，所以深拷贝一份数据再进行操作
      //🟥filter虽然不会修改原数组，会返回一个新数组，但是只有最外层的数据是不一样的，新数组内的复杂类型的属性还是浅拷贝
      hasAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), data.routes)
      // console.log(asyncRoute[0] == hasAsyncRoute[0])
      console.log(hasAsyncRoute)

      //🟥整合该用户所拥有的所有路由
      //1.用于渲染菜单组件
      //2.动态添加路由，注册到路由规则中，用于真正的页面跳转功能
      const allHasRoute = [...constantRoute, ...hasAsyncRoute, ...anyRoute]
      //1.用于渲染菜单组件
      menuRoutes.value = allHasRoute
      //2.动态添加路由，addRoute每次只能添加一个路由规则
      allHasRoute.forEach((item: any) => {
        router.addRoute(item)
      })
    } else {
      return Promise.reject(code)
    }
  }

  //退出登录接口在此函数内,需要先保证退出请求成功再执行后续逻辑
  const logout = async () => {
    //1.发送请求：告诉服务器，本次登录所用到的token已经因logout而失效
    const result = await userLogoutAPI()

    // console.log(typeof result.data)
    if (result.code === 200) {
      //2.清除持久化的token
      localStorage.removeItem('TOKEN')
      //3.清空pinia中保存的用户数据
      clearUserInfo()
    } else {
      return Promise.reject(new Error(result.message))
    }
  }

  return {
    token,
    menuRoutes,
    ReGetUserInfo,
    logout,
    setUserInfo,
    clearUserInfo,
    userInfo,
    btnRoutes,
  }
})
