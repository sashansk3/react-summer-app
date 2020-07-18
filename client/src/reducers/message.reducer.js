import { SET_MESSAGES } from '../actions/message.action'

// types: info, error, alert, warning, success
const initialState = {
  list: []
}

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES: return {...state, list: action.payload}

    default: return state
  }
}