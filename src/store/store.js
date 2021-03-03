import {
    createStore,
    combineReducers,
} from 'redux'
import customerSelectReducer from './customer/select/reducer'
import companyDescReducer from './company/desc/reducer'

export default createStore(
    combineReducers({
        ...customerSelectReducer,
        ...companyDescReducer,
    }),
)