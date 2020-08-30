import { SET_MESSAGES } from '../actions/message.action'
import { MessagesInterface } from '../types/messages'

// types: info, error, alert, warning, success
const initialState: MessagesInterface = {
  list: [],
}

export const messageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, list: action.payload }

    default:
      return state
  }
}
