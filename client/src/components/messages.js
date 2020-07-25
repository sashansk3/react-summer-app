import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { deleteMessage } from '../actions/message.action'

import "../styles/messages.scss"
import Message from './message'
const Messages = () => {
  const 
    dispatch = useDispatch(),
    messages  = useSelector(store => store.messages.list, shallowEqual);

  let deleteMessageAction = id => {
    let message = document.getElementById(`message${id}`)
    message.classList.add("delete")
    setTimeout(() => {
      dispatch(deleteMessage(id))
    }, 2500)
  }
  return(
    <div className="messages">
      {messages.map(message =>
          <Message 
            key           = {message.id}
            id            = {message.id}
            message       = {message}
            deleteMessage = {deleteMessageAction}
          />
      )}
    </div>
  )
}

export default Messages