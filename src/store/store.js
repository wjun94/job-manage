import {
    createStore,
    combineReducers,
} from 'redux'
import customerSelectReducer from './customer/select/reducer'
import customerNotReducer from './customer/not/reducer'
import customerMeReducer from './customer/me/reducer'
import customerTodayReducer from './customer/today/reducer'
import customerAwayReducer from './customer/away/reducer'
import customerPubReducer from './customer/pub/reducer'
import customerFormerReducer from './customer/former/reducer'
import customerExpectedReducer from './customer/expected/reducer'
import customerReserveReducer from './customer/reserve/reducer'
import customerBeingReducer from './customer/being/reducer'
import instituteAllReducer from './institute/all/reducer'
import instituteNotReducer from './institute/not/reducer'
import instituteExperienceReducer from './institute/experience/reducer'
import instituteCooperationReducer from './institute/cooperation/reducer'
import instituteMaturityReducer from './institute/maturity/reducer'
import companyDescReducer from './company/desc/reducer'

export default createStore(
    combineReducers({
        ...customerSelectReducer,
        ...customerReserveReducer,
        ...customerMeReducer,
        ...companyDescReducer,
        ...customerNotReducer,
        ...customerTodayReducer,
        ...customerAwayReducer,
        ...customerPubReducer,
        ...customerFormerReducer,
        ...customerBeingReducer,
        ...customerExpectedReducer,
        ...instituteAllReducer,
        ...instituteNotReducer,
        ...instituteExperienceReducer,
        ...instituteCooperationReducer,
        ...instituteMaturityReducer,
    }),
)