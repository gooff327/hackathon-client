import { User, UserActionTypes, UserActionTypesEnum } from './types'

export const updateUser = (user: User): UserActionTypes => ({
  type: UserActionTypesEnum.UPDATE_USER,
  payload: user
})
