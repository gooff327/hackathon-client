import { HomeActionTypes, HomeActionEnumTypes } from './types'

export const updateKeyword = (payload: { keyword: string }): HomeActionTypes => ({
  type: HomeActionEnumTypes.UPDATE_KEYWORD,
  payload: payload
})
export const updateCategory = (payload: { category: string }): HomeActionTypes => ({
  type: HomeActionEnumTypes.UPDATE_CATEGORY,
  payload: payload
})
export const updateSort = (payload: { sortByDate: boolean, sortReverse: boolean, sortByHot: boolean }): HomeActionTypes => ({
  type: HomeActionEnumTypes.UPDATE_SORT,
  payload: payload
})
