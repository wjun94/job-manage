import {
    SETDATA,
    SETLIST
} from './action-type'

export const setData = (data: {}) => {
    return {
        type: SETDATA,
        data: { ...data }
    }
}

export const setList = (list: any[]) => {
    return {
        type: SETLIST,
        list: [...list]
    }
}