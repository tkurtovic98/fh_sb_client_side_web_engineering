
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({fetch: window.fetch})),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

window.store = store;

export default store
