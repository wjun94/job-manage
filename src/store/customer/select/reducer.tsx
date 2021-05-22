import type { CommonType1 } from '@/store/redux.d'
import { INIT, SETLIST, SETCURRENT, PAGESIZE, PAGINATION } from './action-type'

const initState: CommonType1 = {
  total: 0,
  pageSize: 10,
  current: 1,
  paginationProps: {},
  list: [],
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
      }
    default:
      return state
  }
}
