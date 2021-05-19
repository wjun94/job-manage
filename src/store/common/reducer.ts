import { COMMONMNGLIST } from './action-type'

const initState = {
  mngList: [], // 管理员列表
}

const commonReducer = (state = initState, action: any) => {
  switch (action.type) {
    case COMMONMNGLIST:
      return {
        ...state,
        mngList: action.data,
      }
    default:
      return state
  }
}

const obj = {
  commonReducer,
}

export default obj
