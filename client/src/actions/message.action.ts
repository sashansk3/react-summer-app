import { MessageInterface, MessageType } from '../types/messages'

export const SET_MESSAGES = 'SET_MESSAGES'
export const setMessages = (list: MessageInterface[]) => {
  return {
    type: SET_MESSAGES,
    payload: list,
  }
}
export const setMessage = (text: string, type: MessageType) => {
  return (dispatch: any, getState: any) => {
    let newList = [...getState().messages.list]
    const newMessage: MessageInterface = {
      id: newList.length,
      type: type,
      text: text,
    }
    newList.push(newMessage)
    dispatch(setMessages(newList))
  }
}

export const deleteMessage = (id: number) => {
  return (dispatch: any, getState: any) => {
    let list = getState().messages.list.filter((msg: MessageInterface) => msg.id !== id)
    dispatch(setMessages(list))
  }
}
