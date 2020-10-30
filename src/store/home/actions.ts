import { HomeActionTypes, HomeActionEnumTypes } from './types'

export const addToLikeMap = (payload: { [id: string]: boolean}): HomeActionTypes => ({
  type: HomeActionEnumTypes.ADD_POST_TO_LIKE,
  payload: payload
})

export const removeFromLikeMap = (payload: { [id: string]: boolean}): HomeActionTypes => ({
  type: HomeActionEnumTypes.REMOVE_POST_TO_LIKE,
  payload: payload
})
