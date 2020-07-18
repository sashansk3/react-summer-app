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
    console.log("id")
    console.log(id)
    let list = [...getState().messages.list]
    let msgIndex = list.findIndex(msg => msg.id === id)
    list.splice(msgIndex, 1)
    if(list.length !== 0){ 
      const lastId = list[list.length-1].id
      for(let i = msgIndex; i < list.length; i++) {
        list[i].id = lastId + i
      }
    }

    dispatch(setMessages(list))
  }
}