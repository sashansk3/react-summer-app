import { SET_SUBJECTS, OPEN_POPUP, CLOSE_POPUP, SET_SHOW_SUBJECT, SET_NAME, SET_WEEK, SET_LABS, SET_TYPE } from '../actions/action.subject'

const initialState = {
  subjects   : [],
  showSubject: {
    id      : null,
    week    : "",
    teachers: [],
    name    : "",
    labs : 0,
    type    : "",
  },
  isOpen     : false,
}

export const subjectsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Изменить предметы
    case SET_SUBJECTS    : return { ...state, subjects: action.payload}
    case SET_SHOW_SUBJECT: return { ...state, showSubject: action.payload}
    case OPEN_POPUP      : return { ...state, isOpen: true}
    case CLOSE_POPUP     : return { ...state, isOpen: false}

    default:
      return state
  }
}