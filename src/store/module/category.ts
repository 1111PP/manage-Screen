import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import {
  type CategoryObj,
  type CategoryResponseData,
} from '@/api/product/attr/type'
export const useCategoryData = defineStore('category', () => {
  //一级分类数据
  const firstCategoryData = ref<CategoryObj[]>([])
  const firstCurrID = ref<number | string>('')
  //二级分类数据
  const secondCategoryData = ref<CategoryObj[]>([])
  const secondCurrID = ref<number | string>('')

  //三级分类数据
  const thirdCategoryData = ref<CategoryObj[]>([])
  const thirdCurrID = ref<number | string>('')

  const resetStore = () => {
    firstCurrID.value = ''
    secondCurrID.value = ''
    thirdCurrID.value = ''
    firstCategoryData.value = []
    secondCategoryData.value = []
    thirdCategoryData.value = []
  }
  return {
    resetStore,
    firstCurrID,
    secondCurrID,
    thirdCurrID,
    firstCategoryData,
    secondCategoryData,
    thirdCategoryData,
  }
})
