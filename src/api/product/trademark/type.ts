export interface baseType {
  code: number
  message: string
  ok: boolean
}

//列表中单条品牌的数据
export interface TradeMarkType {
  id?: number
  tmName: string
  logoUrl: string
}

//品牌列表中的数据,数组
export type RecordsType = TradeMarkType[]

//获取的已有全部品牌的数据ts类型
export interface getHasTrademarkAPIType extends baseType {
  data: {
    records: RecordsType
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

export interface delBrandAPIType extends baseType {
  data: string
}
