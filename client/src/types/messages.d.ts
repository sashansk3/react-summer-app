type MessageType = 'info' | 'error' | 'alert' | 'warning' | 'success'

export interface MessageInterface {
  id?: number
  type: MessageType
  text: string
}

export interface MessagesInterface {
  list: MessageInterface[]
}
