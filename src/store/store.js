import {
    createStore,
    combineReducers,
} from 'redux'
import customerListReducer from './customer/list/reducer'
import companyDescReducer from './company/desc/reducer'

export default createStore(
    combineReducers({
        ...customerListReducer,
        ...companyDescReducer,
    }),
)