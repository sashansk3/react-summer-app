import React, { useEffect } from 'react'

import "../styles/message.scss"
const Message = ({id, message, deleteMessage}) => {
  var timer

  useEffect(() => {
    timer = setTimeout(() => {
      deleteMessage(id)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  
  const deleteMessageAction = () => {
    clearTimeout(timer)
    deleteMessage(id)
  }

  return(
    <div className={`message message__${message.type}`} id={`message${id}`}>
      <span className="message_close" onClick={deleteMessageAction}>X</span>
      {message.text}
    </div>
  )
}

export default Message