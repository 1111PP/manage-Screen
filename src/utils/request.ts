import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserData } from '@/store/module/user'
// 创建axios实例
const httpInstance = axios.create({
  // baseURL 直接使用了 import.meta.env.VITE_APP_BASE_API==='/api'，由于这个字符串是相对路径，Axios 会自动将其拼接到当前页面的 URL 后面，形成完整的请求 URL,等同于baseURL: 'http://localhost:5173' + import.meta.env.VITE_APP_BASE_API,。
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 3000,
})

// 添加请求拦截器
httpInstance.interceptors.request.use((config) => {
  //获取用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
  const userStore = useUserData()
  if (userStore.token) {
    // console.log(userStore.token)
    config.headers.token = userStore.token
  }
  //config配置对象,headers属性请求头,经常给服务器端携带公共参数
  //返回配置对象
  return config
})
// 添加响应拦截器
httpInstance.interceptors.response.use(
  (res) => {
    const result = res.data
    // console.log(result)

    //🟥🟥🟥对于网络问题造成的错误，它不会返回响应结果，直接在错误回调中处理，对于有响应结果的请求，都统一处理，200为请求成功，直接返回，其余都错误弹窗
    if (result.code === 200) {
      return result
    } else {
      let message: string = ''
      //http状态码
      const status = result.code
      switch (status) {
        case 401:
          message = 'TOKEN过期'
          break
        case 403:
          message = '无权访问'
          break
        case 404:
          message = '请求地址错误'
          break
        case 500:
          message = '服务器出现问题'
          break
      }
      //部分code为201的问题需要具体到组件中处理,如密码错误,系统品牌无法删除都会返回201
      //提示错误信息
      if (message !== '')
        ElMessage({
          type: 'error',
          message,
        })
      return result
    }
  },
  (e) => {
    //提示错误信息
    ElMessage({
      type: 'error',
      message: '网络出现问题',
    })
    return Promise.reject(e)
  }
)

export default httpInstance
