import { combineReducers } from 'redux'
import { todosReducer } from './todos'
import { userReducer } from './user'
import { subjectsReducer } from './subjects'
import { labsReducer } from './labs.reducer'

export const rootReducer = combineReducers({
  todos   : todosReducer,
  user    : userReducer,
  subjects: subjectsReducer,
  labs    : labsReducer,
})