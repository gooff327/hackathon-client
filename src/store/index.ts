import rootReducer from './rootReducers'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: rootReducer
})

// @ts-ignore
const { hot } = module

if (hot) {
  // Enable Webpack hot module replacement for reducers
  hot.accept('./rootReducers', () => {
    const nextRootReducer = require('./rootReducers')
    store.replaceReducer(nextRootReducer)
  })
}

export default store
