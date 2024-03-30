import request from '@/utils/request'
import type {
  CategoryResponseData,
  AttrResponseData,
  Attr,
  AttrValue,
} from './type'
enum API {
  FIRST_CATEGORY = '/admin/product/getCategory1',
  SECOND_CATEGORY = '/admin/product/getCategory2/',
  THIRD_CATEGORY = '/admin/product/getCategory3/',
  //获取分类下已有的属性与属性值
  ATTR_URL = '/admin/product/attrInfoList/',
  //添加或者修改已有的属性的接口
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  //删除某一个已有的属性
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

//获取一级分类的接口方法
export const firstCategoryAPI = () =>
  request.get<any, CategoryResponseData>(API.FIRST_CATEGORY)
//获取二级分类的接口方法
export const secondCategoryAPI = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.SECOND_CATEGORY + category1Id)
//获取二级分类的接口方法
export const thirdCategoryAPI = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.THIRD_CATEGORY + category2Id)

//获取对应分类下已有的属性与属性值接口
export const reqAttrAPI = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`
  )

//新增或者修改已有的属性接口
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data)

//删除某一个已有的属性业务
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId)
