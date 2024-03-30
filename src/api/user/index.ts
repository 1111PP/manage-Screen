import request from '@/utils/request.ts'
//引入接口
import {
  type loginRequest,
  type userInfoType,
  type userInfoAPIType,
  type layoutAPIType,
} from '@/api/user/type'

//项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

//登录接口
export const reqLoginAPI = (userLoginInfo: any) => {
  //request.post<any, loginRequest>表示最终会返回一个Promise<loginRequest>的数据，Promise又会返回loginRequest类型数据，即用户登录后所需数据
  return request.post<any, loginRequest>(API.LOGIN_URL, userLoginInfo)
}

// 获取用于信息接口
export const getUserInfoApi = () => {
  return request.get<any, userInfoAPIType>(API.USERINFO_URL)
}

// logout接口
export const userLogoutAPI = () => {
  return request.post<any, layoutAPIType>(API.LOGOUT_URL)
}
