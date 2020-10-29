import { UserActionTypes, UserActionTypesEnum, UserState } from './types'
import { getFromLocalStorage } from '../../utils'

const me = getFromLocalStorage('me')

const initialState: UserState = {
  me: me || { id: '', email: '', avatar: '', role: '', verified: false, name: '' }
}

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case UserActionTypesEnum.UPDATE_USER:
      return {
        ...state,
        me: {
          ...state.me,
          ...action.payload
        }
      }
    default: return state
  }
}
export default userReducer
