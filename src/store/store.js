import {
    createStore,
    combineReducers,
} from 'redux'
import customerSelectReducer from './customer/select/reducer'
import customerMeReducer from './customer/me/reducer'
import customerReserveReducer from './customer/reserve/reducer'
import companyDescReducer from './company/desc/reducer'

export default createStore(
    combineReducers({
        ...customerSelectReducer,
        ...customerReserveReducer,
        ...customerMeReducer,
        ...companyDescReducer,
    }),
)