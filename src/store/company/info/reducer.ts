import {
    SETDATA
} from './action-type'

const initState = {
    data: null,
}

const companyInfoReducer = (state = initState, action: any) => {
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
        default:
            return state
    }
}

const obj = {
    companyInfoReducer
}

export default obj