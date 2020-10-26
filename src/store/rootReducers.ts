import { combineReducers } from 'redux'
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from 'react-redux'

const rootReducer = combineReducers({
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
