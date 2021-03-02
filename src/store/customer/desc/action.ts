import {
    SETDATA
} from './action-type'

export const setData = (data: {}) => {
    return {
        type: SETDATA,
        data: { ...data }
    }
}
