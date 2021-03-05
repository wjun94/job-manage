import {
    SETDATA,
    SETLIST
} from './action-type'

const initState = {
    data: null,
    list: [],
}

const companyDescReducer = (state = initState, action: any) => {
    switch (action.type) {
        case SETDATA:
            for (let i in action.data) {
                if (!action.data[i]) {
                    action.data[i] = null
                }
            }
            return {
                ...state,
                data: action.data
            }
        case SETLIST:
            return { ...state, list: action.list }
        default:
            return state
    }
}

const obj = {
    companyDescReducer
}

export default obj