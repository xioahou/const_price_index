import instance from "@/utils/request";
export const homeListApi = (data) => {
  return instance({
    method: 'get',
    url: '/index/priceInquiry',
    params: data
  })
}

export const submitFileApi = (data) => {

  return instance({
    method: 'post',
    url: '/index/priceInquiryEdit',
    data: data
  })
}
export const getListApi = (id) => {
  return instance({
    method: 'get',
    url: '/index/priceInquiryInfo',
    params: {
      id: id
    }
  })
}
export const addLikeApi = (data) => {
  return instance({
    url: 'index/priceInquiryUpDown',
    method: 'post',
    data
  })
}

export const getNewPriceListApi = (data) => {
  return instance({
    url: 'index/priceInquiryList',
    method: 'get',
    params: data
  })
}
export const getPriceTotalApi = (search) => {
  return instance({
    url: 'index/priceInquiryTotal',
    method: 'get',
    params: {
      search
    }
  })
}
export const getProductListApi = (data) => {
  return instance({
    url: 'Product/customized',
    method: 'get',
    params: data
  })
}
//添加到比价列表
export const addCompareListApi = (ids) => {
  return instance({
    url: 'Comparison/priceAdd',
    method: 'post',
    data: {
      ids
    }
  })
}
//获取比价列表总数
export const getCompareTotalApi = () => {
  return instance({
    url: 'Comparison/priceIndex',
    method: 'get',
  })
}
//获取比价列表数据
export const getCompareListApi = () => {
  return instance({
    url: 'Comparison/priceAllList',
    method: 'get',

  })
}
//删除比价列表中数据
export const delCompareListApi = (ids) => {
  return instance({
    url: 'Comparison/priceDel',
    method: 'post',
    data: {
      ids
    }
  })
}
//获取已经勾选的比价
export const getCheckedCompareApi = (ids) => {
  return instance({
    url: "Comparison/priceList",
    method: "get",
    params: {
      ids
    }
  })
}
