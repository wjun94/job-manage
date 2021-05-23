import { INIT, SETLIST, SETCURRENT, PAGESIZE, PaginationProps, PARAMS } from './action-type'

export const init = () => {
  return {
    type: INIT,
  }
}

export const setList = (list: [] = []) => {
  return {
    type: SETLIST,
    list: [...list],
  }
}

export const setCurrent = (current: number = 1) => {
  return {
    type: SETCURRENT,
    current,
  }
}

export const setPageSize = (pageSize: number = 10) => {
  return {
    type: PAGESIZE,
    pageSize,
  }
}

export const setPaginationProps = (paginationProps: {}) => {
  return {
    type: PaginationProps,
    paginationProps,
  }
}

export const setParams = (params: {}) => {
  return {
    type: PARAMS,
    params,
  }
}
