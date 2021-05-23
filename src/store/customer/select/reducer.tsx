import type { CommonType1 } from '@/store/redux.d'
import { INIT, SETLIST, SETCURRENT, PAGESIZE, PaginationProps, PARAMS } from './action-type'
import { CompanySelectNode } from '@/app/common.d'

const initState: CommonType1<CompanySelectNode> = {
  total: 0,
  pageSize: 10,
  current: 1,
  paginationProps: {},
  list: [],
  params: { manageId: '' }, // 接口请求参数
}

const customerSelectReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SETLIST:
      return {
        ...state,
        list: action.list,
      }
    case SETCURRENT:
      return {
        ...state,
        current: action.current,
      }
    case PAGESIZE:
      return {
        ...state,
        pageSize: action.pageSize,
      }
    case PaginationProps:
      return {
        ...state,
        paginationProps: action.paginationProps,
      }
    case PARAMS:
      // 点击搜索，清空页码
      return {
        ...state,
        params: action.params,
        current: 1,
      }
    case INIT:
      return {
        ...state,
        pageSize: 10,
        current: 1,
        list: [],
        params: { manage: 'all' },
      }
    default:
      return state
  }
}

const result = {
  customerSelectReducer,
}

export default result
