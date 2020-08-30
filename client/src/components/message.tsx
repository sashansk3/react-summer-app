import React, { useEffect } from 'react'
import '../styles/message.scss'
import { MessageInterface } from '../types/messages'

interface MessagePropsInterface {
  id: number
  message: MessageInterface
  deleteMessage(id: number): void
}

const Message = (props: MessagePropsInterface) => {
  const { id, message, deleteMessage } = props
  useEffect(() => {
    let timer = setTimeout(() => {
      deleteMessage(id)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [deleteMessage, id])
  return (
    <div className={`message message__${message.type}`} id={`message${id}`}>
      <span className="message_close" onClick={() => deleteMessage(id)}>
        X
      </span>
      {message.text}
    </div>
  )
}

export default Message
