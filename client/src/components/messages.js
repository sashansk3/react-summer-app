import React, { useEffect } from 'react'
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
      document.getElementById(`message${id}`).classList.remove("delete")
      dispatch(deleteMessage(id))
    }, 2500)
  }

  let mappedMessages = messages.map(message => {
    return(
      <Message 
        key           = {message.id}
        deleteMessage = {deleteMessageAction}
        message       = {message}
        id            = {message.id}
      />
    )
  })

  return(
    <div className="messages">
      {mappedMessages}
    </div>
  )
}

export default Messages