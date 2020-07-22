import React, { useRef } from "react"
import { useDispatch }  from "react-redux"
import { showTodo } from "../actions/action.todo.js"
import "../styles/todo.scss"

export default function Todo({todo}){
  const
    that = useRef(null),
    dispatch = useDispatch(),
    additionalClassName = todo.deadline !== "-" && todo.deadline !== ""? checkDate(todo.deadline): "green",
    completed = todo.status? "completed": "";
  const setTodoAction = () => {
    let prevElem = document.querySelector(".active")
    prevElem && prevElem.classList.remove("active")
    that.current.classList.add("active")
    dispatch(showTodo(todo.id))
  }

  return (
    <div className={`todo`} ref={that} onClick={setTodoAction}>
      <small 
        className={`todo_deadline todo_deadline__${additionalClassName}`}
      >
        {todo.deadline?todo.deadline:"-"}
      </small>
      
      <div className={`todo__title ${completed}`}>
        {todo.title}  
      </div>
    </div>
  )
}

function checkDate(deadlineString){
  let
    day = 86400000,
    additionalClassName = "green",
    deadline = new Date(deadlineString),
    curDate = new Date().toISOString().split("T")[0],
    curDateNum = new Date(curDate);

  if(deadline - curDateNum < 0)
    additionalClassName = "miss"
  else if(deadline - curDateNum <= day)
    additionalClassName = "alert"
  else if(deadline - curDateNum <= 3*day) 
    additionalClassName = "warning"
    
  return additionalClassName   
}