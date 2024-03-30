import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
//创建路由器
const router = createRouter({
  //路由模式hash
  history: createWebHashHistory(),
  routes: constantRoute,
  //路由切换后，滚动条位置归0
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
export default router
