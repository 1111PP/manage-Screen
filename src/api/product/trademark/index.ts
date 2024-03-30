//品牌管理模块接口
import request from '@/utils/request'
import {
  type getHasTrademarkAPIType,
  type delBrandAPIType,
  type TradeMarkType,
} from './type'
enum API {
  //获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  //删除已有品牌
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}

//获取已有品牌的接口方法
//page:获取第几页 ---默认第一页
//limit:获取几个已有品牌的数据
export const getHasTrademarkAPI = (page: number, limit: number) =>
  request.get<any, getHasTrademarkAPIType>(
    API.TRADEMARK_URL + `${page}/${limit}`
  )

export const delBrandAPI = (id: number) => {
  return request.delete<any, delBrandAPIType>(API.DELETE_URL + `/${id}`)
}

export const addOrEditBrandAPI = (data: TradeMarkType) => {
  // console.log(data)
  //修改已有品牌的数据
  if (data.id !== 0) {
    // console.log(0)
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    // console.log(1)
    //新增品牌
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
