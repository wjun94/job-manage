import {
    createStore,
    combineReducers,
} from 'redux'
import customerSelectReducer from './customer/select/reducer'
import customerNotReducer from './customer/not/reducer'
import customerMeReducer from './customer/me/reducer'
import customerTodayReducer from './customer/today/reducer'
import customerReserveReducer from './customer/reserve/reducer'
import instituteAllReducer from './institute/all/reducer'
import instituteNotReducer from './institute/not/reducer'
import instituteExperienceReducer from './institute/experience/reducer'
import instituteCooperationReducer from './institute/cooperation/reducer'
import companyDescReducer from './company/desc/reducer'

export default createStore(
    combineReducers({
        ...customerSelectReducer,
        ...customerReserveReducer,
        ...customerMeReducer,
        ...companyDescReducer,
        ...customerNotReducer,
        ...customerTodayReducer,
        ...instituteAllReducer,
        ...instituteNotReducer,
        ...instituteExperienceReducer,
        ...instituteCooperationReducer,
    }),
)