import React, { useRef } from "react"
import { useDispatch }  from "react-redux"
import { showTodo } from "../actions/action.todo.js"
import "../styles/todo.scss"

export default function Todo({todo}){
  const
    that = useRef(null),
    dispatch = useDispatch(),
    additionalClassName = !todo.status && todo.deadline !== "-"? checkDate(todo.deadline): "green",
    completed = todo.status? "completed": "";

  const setTodoAction = () => {
    let prevElem = document.querySelector(".active")
    prevElem && prevElem.classList.remove("active")
    that.current.classList.add("active")
    dispatch(showTodo(todo.id))
  }

  return (
    <div className={"todo " + additionalClassName} ref={that} onClick={setTodoAction}>
      <small 
        className={"todo__top__deadline "+additionalClassName+"Date"}
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
    curDate  = new Date(`${new Date().getFullYear()}-${new Date().getMonth() > 10?"":"0"+(new Date().getMonth() + 1)}-${new Date().getDate()}`);

  if(deadline - curDate < 0)
    additionalClassName = "dark"
  else if(deadline - curDate <= day)
    additionalClassName = "red"
  else if(deadline - curDate <= 3*day) 
    additionalClassName = "yellow"
    
  return additionalClassName   
}