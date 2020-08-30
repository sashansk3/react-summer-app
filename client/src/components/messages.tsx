import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { MessageInterface } from '../types/messages'
import { deleteMessage } from '../actions/message.action'

import '../styles/messages.scss'
import Message from './message'
import { RootState } from '../reducers'
const Messages = () => {
  const dispatch = useDispatch(),
    messages = useSelector((store: RootState) => store.messages.list, shallowEqual)

  let deleteMessageAction = (id: number) => {
    let message: HTMLElement = document.getElementById(`message${id}`)!
    message.classList.add('delete')
    setTimeout(() => {
      dispatch(deleteMessage(id))
    }, 2500)
  }
  return (
    <div className="messages">
      {messages.map((message: MessageInterface & { id: number }) => (
        <Message
          key={message.id}
          id={message.id}
          message={message}
          deleteMessage={deleteMessageAction}
        />
      ))}
    </div>
  )
}

export default Messages
