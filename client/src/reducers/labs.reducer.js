import { OPEN_POPUP, CLOSE_POPUP, SET_LAB } from '../actions/labs.actions'

const initialState = {
  isOpen : false,
  showLab: {
    id       : null,
    date     : "",
    points   : 0,
    max_points: 0,
    status   : "false",
  },
}

export const labsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POPUP : return { ...state, isOpen: true }
    case CLOSE_POPUP: return { ...state, isOpen: false }
    case SET_LAB    : return { ...state, showLab: action.payload }

    default:
      return state
  }
}