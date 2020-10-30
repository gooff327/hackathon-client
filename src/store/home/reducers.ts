import { HomeState, HomeActionTypes, HomeActionEnumTypes } from './types'

const initialState: HomeState = {
  likeMap: {}
}

const homeReducer = (state = initialState, { type, payload }: HomeActionTypes) => {
  switch (type) {
    case HomeActionEnumTypes.ADD_POST_TO_LIKE:
    case HomeActionEnumTypes.REMOVE_POST_TO_LIKE:
      return {
        ...state,
        likeMap: {
          ...state.likeMap,
          ...payload
        }
      }
    default: return state
  }
}

export default homeReducer
