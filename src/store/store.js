import {
    createStore,
    combineReducers,
} from 'redux'
import customerListReducer from './customer/list/reducer'
import customerDescReducer from './customer/desc/reducer'

export default createStore(
    combineReducers({
        ...customerListReducer,
        ...customerDescReducer,
    }),
)