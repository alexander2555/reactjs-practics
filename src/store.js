import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import {
  postReducer,
  postsReducer,
  userReducer,
  usersReducer,
  appReducer,
} from './reducers'

const reducer = combineReducers({
  post: postReducer,
  posts: postsReducer,
  user: userReducer,
  users: usersReducer,
  app: appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
