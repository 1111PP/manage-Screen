import { useUserData } from '@/store/module/user'
// 用法示例：判断该按钮是否拥有用户删除权限（btn1.User.remove）
//  <el-button v-has="`btn1.User.remove`" size="small" icon="delete" type="danger">删除</el-button>

export default function vHas(app: any) {
  const userData = useUserData()
  app.directive('has', (el: HTMLElement, binding: any) => {
    //判断该用户所拥有的按钮权限数据（btnRoutes）中是否存在该权限，若不存在。则移除该按钮，表示该用户无权操作此按钮权限
    if (!userData.btnRoutes.includes(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  })
}
