import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type loginInfo } from '@/api/user/type.ts'
import { ElMessage } from 'element-plus'

export const useUserData = defineStore('userData', () => {
  const token = ref<string>('')
  return { token }
})
