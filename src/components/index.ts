import svgIcon from '@/components/SvgIcon/index.vue'
import Category from '@/components/Category/index.vue'
//引入所有el-plus图标，便于下方全局注册所有图标组件，更好服务于layout中左侧的菜单栏图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalComponents: any = {
  svgIcon,
  Category,
}
export default {
  install(app: any) {
    //注册allGlobalComponents中的所有组件作为全局组件
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })
    //注册所有图标成为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
