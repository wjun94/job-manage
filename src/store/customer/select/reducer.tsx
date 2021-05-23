import type { CommonType1 } from '@/store/redux.d'
import { INIT, SETLIST, SETCURRENT, PAGESIZE, PAGINATION } from './action-type'
import { CompanySelectNode } from '@/app/common.d'

const initState: CommonType1<CompanySelectNode> = {
  total: 0,
  pageSize: 10,
  current: 1,
  paginationProps: {},
  list: [],
  params: { manage: 'all' }, // 接口请求参数
}

export const customerSelectReducer = (state = initState, action: any) => {
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
    case PAGINATION:
      return {
        ...state,
        paginationProps: action.paginationProps,
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
