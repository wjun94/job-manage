import {
    createStore,
    combineReducers,
} from 'redux'
import recruitListReducer from './recruit/list/reducer'
import companyInfoReducer from './company/info/reducer'

export default createStore(
    combineReducers({
        ...recruitListReducer,
        ...companyInfoReducer,
    }),
)