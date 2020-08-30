import React, { useRef } from 'react'
import { TodoInterface } from '../types/todos'
import '../styles/todo.scss'

interface TodoPropsInterface {
  todo: TodoInterface
  showTodo(id: number | null): void
}
export default function Todo(props: TodoPropsInterface) {
  const { todo, showTodo } = props
  const that = useRef<HTMLDivElement>(null)
  const status = checkDate(todo.deadline)
  const completed = todo.status ? 'completed' : ''

  const setTodoAction = () => {
    let prevElem = document.querySelector('.active')
    prevElem && prevElem.classList.remove('active')
    that.current!.classList.add('active')
    showTodo(todo.id)
  }

  return (
    <div className={`todo`} ref={that} onClick={setTodoAction}>
      <small className={`todo_deadline todo_deadline__${status}`}>
        {todo.deadline ? todo.deadline : '-'}
      </small>

      <div className={`todo__title ${completed}`}>{todo.title}</div>
    </div>
  )
}

function checkDate(deadlineString: string) {
  let status = 'green'
  if (deadlineString === '-' || deadlineString === '') {
    return status
  }

  let deadline: any = new Date(deadlineString)
  let curDate: number = +new Date().toISOString().split('T')[0]
  let curDateNum: any = new Date(curDate)

  const day = 86400000
  if (deadline - curDateNum < 0) {
    status = 'miss'
  } else if (deadline - curDateNum <= day) {
    status = 'alert'
  } else if (deadline - curDateNum <= 3 * day) {
    status = 'warning'
  }

  return status
}
