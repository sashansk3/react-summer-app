import { SET_SUBJECTS, OPEN_POPUP, CLOSE_POPUP, SET_SUBJECT, SET_EDIT_FLAG } from '../actions/action.subject'

const initialState = {
  subjects   : [],
  isOpen     : false,
  editFlag   : false,
  subject: {
    id       : null,
    name     : "",
    week     : "all",
    type     : "exam",
    teachers : [],
    labsCount: 0,
  },
}

export const subjectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBJECTS : return { ...state, subjects: action.payload}
    case SET_SUBJECT  : return { ...state, subject: action.payload}
    case OPEN_POPUP   : return { ...state, isOpen: true}
    case CLOSE_POPUP  : return { ...state, isOpen: false}
    case SET_EDIT_FLAG: return { ...state, editFlag: action.payload}

    default:
      return state
  }
}