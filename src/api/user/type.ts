export interface loginInfo {
  username: string
  password: string
}

// 用户数据类型
export interface userInfoType {
  routes: string[]
  buttons: string[]
  roles: string[]
  name: string
  avatar: string
}

//通用继承接口类型
export interface baseType {
  code: number
  message: string
  ok: boolean
}
//登录api返回数据类型
export interface loginRequest extends baseType {
  data: string
}
//请求用户信息的接口返回数据类型
export interface userInfoAPIType extends baseType {
  data: userInfoType
}
// layout请求返回数据类型
// 返回成功时响应对象.data:null
export interface layoutAPIType extends baseType {
  data: object
}
