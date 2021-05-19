import { COMMONMNGLIST } from './action-type'

export const setMngList = () => {
  return async (dispath, state) => {
    const { commonReducer } = await state()
    if (!commonReducer.mngList.length) {
      await window.$api.mngList().then((res) => dispath({ type: COMMONMNGLIST, data: res }))
    }
  }
}
