import { HomeActionTypes, HomeActionEnumTypes } from './types'

export const addToLikeMap = (status = true): HomeActionTypes => ({
  type: HomeActionEnumTypes.ADD_POST_TO_LIKE,
  payload: { status }
})

export const removeFromLikeMap = (status = false): HomeActionTypes => ({
  type: HomeActionEnumTypes.REMOVE_POST_TO_LIKE,
  payload: { status }
})
