import {
    INIT,
    SETLIST,
    SETCURRENT,
    PAGESIZE,
    PAGINATION,
} from './action-type'

export const init = () => {
    return {
        type: INIT,
    }
}

export const setList = (list: [] = []) => {
    return {
        type: SETLIST,
        list: [...list]
    }
}

export const setCurrent = (current: number = 1) => {
    return {
        type: SETCURRENT,
        current
    }
}

export const setPageSize = (pageSize: number = 10) => {
    return {
        type: PAGESIZE,
        pageSize
    }
}

export const setPagination = (pagination: {}) => {
    return {
        type: PAGINATION,
        pagination
    }
}

export const setPaginationProps = (paginationProps: {}) => {
    return {
        type: PAGINATION,
        paginationProps
    }
}