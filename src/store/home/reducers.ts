import { HomeState, HomeActionTypes, HomeActionEnumTypes } from './types'

const initialState: HomeState = {
  filters: {
    category: '',
    keyword: '',
    sortReverse: true,
    sortByDate: false,
    sortByHot: true
  }
}

const homeReducer = (state = initialState, { type, payload }: HomeActionTypes) => {
  switch (type) {
    case HomeActionEnumTypes.UPDATE_KEYWORD:
    case HomeActionEnumTypes.UPDATE_CATEGORY:
    case HomeActionEnumTypes.UPDATE_SORT:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...payload
        }
      }
    default: return state
  }
}

export default homeReducer
