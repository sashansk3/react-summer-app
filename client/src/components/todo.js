import React from "react"
import { useDispatch }  from "react-redux"
import { deleteTodo, openPopUp, completeTodo } from "../actions/action.todo.js"
import "../styles/todo.scss"

export default function Todo(props){
  const
    dispatch = useDispatch(),
    additionalClassName = !props.todo.status && props.todo.deadline !== "-"? checkDate(props.todo.deadline): "green",
    underline = props.todo.status? "underline": "";

  const 
    deleteTodoAction   = e => dispatch(deleteTodo(e.target.id)),
    openPopUpAction    = e => dispatch(openPopUp(e.target.id)),
    completeTodoAction = e => dispatch(completeTodo(e.target.id));

  return (
    <div className={"todo " + additionalClassName} id={"todo"+props.todo.id}>
      <div className="todo__top">
        <small className={"todo__top__deadline "+additionalClassName+"Date"}>{props.todo.deadline}</small>
        <div>
          <span className="todo__top__editBtn" onClick={openPopUpAction} id={props.todo.id}>&#9998;</span>
          <span className="todo__top_deleteBtn" id={props.todo.id} onClick={deleteTodoAction}>&#9746;</span>
        </div>
      </div>
      <div className={`todo__title ${underline}`} onClick={completeTodoAction} id={props.todo.id}>
        {props.todo.title}  
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