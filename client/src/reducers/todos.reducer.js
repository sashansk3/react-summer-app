import { SET_TODOS, SET_TEMP_TODOS, SET_TODO, CLOSE_EDIT, EDIT_TODO, ADD_TODO_FORM } from '../actions/action.todo'

const initialState = {
  todos    : [],
  tempTodos: [],
  showPopUp: false,
  editFlag : false,
  todo : {
    id      : null,
    title   : "",
    content : "",
    deadline: "-",
    status  : false,
  },
}

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case SET_TODOS     : return { ...state, todos: action.payload }
    case SET_TODO      : return { ...state, todo: action.payload }
    case SET_TEMP_TODOS: return { ...state, tempTodos: action.payload }
    case EDIT_TODO     : return { ...state, editFlag: "edit" }
    case ADD_TODO_FORM : return { ...state, editFlag: "add" }
    case CLOSE_EDIT    : return { ...state, editFlag: false }

    default:
      return state
  }
}