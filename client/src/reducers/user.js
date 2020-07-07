import { SET_USER, UNSET_USER, OPEN_POPUP, CLOSE_POPUP } from '../actions/action.user'
import { LOCALSTORAGE_NAME } from "../config/app.conf"

const initialState = {
  user: JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME)) || {
    id      : null,
    login   : "",
    password: "",
  },
  isOpen: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER   : return { ...state, user: action.payload}
    case UNSET_USER : return { ...state, user: {id: null, login: "", password: ""}}
    case OPEN_POPUP : return { ...state, isOpen: true}
    case CLOSE_POPUP: return { ...state, isOpen: false}

    default:
      return state
  }
}