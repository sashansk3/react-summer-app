import { OPEN_LAB_POPUP, CLOSE_LAB_POPUP, SET_LAB, SET_LAB_EDIT_FLAG } from '../actions/labs.actions'

const initialState = {
  isOpen: false,
  editFlag: false,
  lab: {
    id        : null,
    date      : "-",
    points    : 0,
    max_points: 0,
    status    : "false",
  },
}

export const labsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LAB_POPUP   : return { ...state, isOpen: true }
    case CLOSE_LAB_POPUP  : return { ...state, isOpen: false }
    case SET_LAB_EDIT_FLAG: return { ...state, editFlag: action.payload }
    case SET_LAB          : return { ...state, lab: action.payload }

    default:
      return state
  }
}