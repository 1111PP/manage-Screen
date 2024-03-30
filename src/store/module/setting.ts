import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useLayoutSettingStore = defineStore('SettingStore', () => {
  //用户控制菜单折叠还是收起控制
  const fold = ref<boolean>(false)
  const isRefresh = ref<boolean>(false)
  const changeIsRefresh = (v: boolean) => {
    isRefresh.value = v
    //   console.log(isRefresh.value);
  }
  return {
    fold,
    isRefresh,
    changeIsRefresh,
  }
})
