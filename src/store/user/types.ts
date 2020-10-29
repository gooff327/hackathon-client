export interface User {
  id: string
  avatar?: string
  email: string
  verified: boolean
  role: string
  name: string
}

export enum UserActionTypesEnum {
  UPDATE_USER = 'UPDATE_USER'
}

interface UpdateUserAction {
  type: UserActionTypesEnum.UPDATE_USER
  payload: User
}

export interface UserState {
  me: User
}
export type UserActionTypes = UpdateUserAction
