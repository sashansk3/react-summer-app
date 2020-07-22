export const SET_MESSAGES = 'SET_MESSAGES'
export const setMessages = list => {
  return {
    type   : SET_MESSAGES,
    payload: list
  }

}
export const setMessage = msgObj => {
  return (dispatch, getState) => {
    let newList = [...getState().messages.list]
    msgObj.id = newList.length
    newList.push(msgObj)
    dispatch(setMessages(newList))
  }
}

export const deleteMessage = id => {
  return (dispatch, getState) => {
    let list = getState().messages.list.filter(msg => msg.id !== id)
    dispatch(setMessages(list))
  }
}