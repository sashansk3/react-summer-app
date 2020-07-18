import React, { useEffect, useRef } from 'react'

import "../styles/message.scss"
const Message = ({id, message, deleteMessage}) => {
  const that = useRef(null)
  useEffect(() => {
    const timer = setTimeout(() => {
      deleteMessage(id)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return(
    <div className={`message message__${message.type}`} id={`message${id}`} ref={that}>
      <span className="message_close" onClick={() => deleteMessage(id)}>X</span>
      {message.text}
    </div>
  )
}

export default Message