import { combineReducers } from 'redux'
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook
} from 'react-redux'
import userReducer from './user/reducers'
import homeReducer from './home/reducers'

const rootReducer = combineReducers({
  user: userReducer,
  home: homeReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
