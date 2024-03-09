export interface loginInfo {
  username: string
  password: string
}
interface userRequestData {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface dataType {
  token?: string
  message?: string
}
export interface loginRequest {
  code: number
  data: dataType
}
