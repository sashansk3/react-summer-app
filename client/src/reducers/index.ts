import { combineReducers } from 'redux'
import { todosReducer } from './todos.reducer'
import { userReducer } from './user.reducer'
import { subjectsReducer } from './subjects.reducer'
import { labsReducer } from './labs.reducer'
import { messageReducer } from './message.reducer'

export const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
  subjects: subjectsReducer,
  labs: labsReducer,
  messages: messageReducer,
})

export type RootState = ReturnType<typeof rootReducer>
