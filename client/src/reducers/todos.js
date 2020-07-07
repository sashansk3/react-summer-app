import { SET_TODOS, SET_TEMP_TODOS, SET_TODO_TITLE, SET_TODO_DEADLINE, SET_TODO_STATUS, DROP_TODO, OPEN_POPUP, CLOSE_POPUP, SET_EDIT_TODO } from '../actions/action.todo'

const initialState = {
  todos    : [],
  tempTodos: [],
  title    : "",
  deadline : "",
  status   : false,
  showPopUp: false,
}

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case SET_TODOS        : return { ...state, todos: action.payload }
    case SET_TEMP_TODOS   : return { ...state, tempTodos: action.payload }
    case SET_TODO_TITLE   : return { ...state, title: action.payload }
    case SET_TODO_DEADLINE: return { ...state, deadline: action.payload }
    case SET_TODO_STATUS  : return { ...state, status: action.payload }
    case DROP_TODO        : return { ...state, title: "", deadline: "", status: false, id: "" }
    case OPEN_POPUP       : return { ...state, showPopUp: true }
    case CLOSE_POPUP      : return { ...state, showPopUp: false }
    case SET_EDIT_TODO    : return { ...state, title: action.title, deadline: action.deadline, status: action.status, id: action.id }

    default:
      return state
  }
}