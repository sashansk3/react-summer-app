import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Todo from "./todo"
import { searchTodo, filterTodo, getTodos, setTodoTitle, setTodoDeadline, setTodoStatus, addTodo, updateTodo, closePopUp} from "../actions/action.todo.js"
import PopUp from "./popup"
import "../styles/todos.scss"

export default function Todos(){
  const 
    dispatch = useDispatch(),
    user     = useSelector(store => store.user.user, shallowEqual),
    todos    = useSelector(store => store.todos.todos, shallowEqual),
    id       = useSelector(store => store.todos.id, shallowEqual),
    title    = useSelector(store => store.todos.title, shallowEqual),
    deadline = useSelector(store => store.todos.deadline, shallowEqual),
    status   = useSelector(store => store.todos.status, shallowEqual),
    isOpen   = useSelector(store => store.todos.showPopUp, shallowEqual);

  useEffect(() => {
    dispatch(getTodos(user.id))
  }, [dispatch, user.id])

  const searchTodoAction = (e) => {
    let subStr = e.target.value.toLowerCase()
    dispatch(searchTodo(subStr))
  }

  const filterTodoAction = (e) => {
    let type = e.target.value
    dispatch(filterTodo(type))
  }

  const setTodoTitleAction    = e => dispatch(setTodoTitle(e))
  const setTodoDeadlineAction = e => dispatch(setTodoDeadline(e))
  const setTodoStatusAction   = e => dispatch(setTodoStatus(e))
  const updateTodoAction      = () => dispatch(updateTodo())

  if(!user.id){
    return <Redirect to="/" />
  }
  const mapedTodos = todos.map(todo => <Todo key = {todo.id} todo = {todo}/>)

  return (
    <div className="todos">
      <div className="todos-form">
        <label>
          <input onChange={setTodoTitleAction} value={title} placeholder="Title" />
          <div className="todos-form__label">Title</div>
        </label>
        <label>
          <input onChange={setTodoDeadlineAction} value={deadline} type="date" placeholder="Deadline"/><br/>
          <div className="todos-form__label">Deadline</div>
        </label>
        <button className="todos-form__addBtn" onClick={() => dispatch(addTodo(id))}>add todo</button>
      </div>
  
      <div className="todos-filters">
        <input className="filterTodo" onChange={searchTodoAction} placeholder="Search"/>
        Filters
        <select className="todos-filters__select" onChange={filterTodoAction}>
          <option value="deadline">date</option>
          <option value="status">status</option>
          <option value="title">title</option>
        </select>
      </div>
      <div className="todos-list">
        {mapedTodos}
      </div>
      <PopUp
        isOpen = { isOpen }
        close  = { () => dispatch(closePopUp())}
      >
        <div className="todos-PopUp">
          <input onChange={setTodoTitleAction} value={title} placeholder="Title" /><br/>
          <input onChange={setTodoDeadlineAction} value={deadline}type="date"/><br/>
          <input onChange={setTodoStatusAction} checked={status} value={status}type="checkbox"/><br/>
          <button id={id} onClick={updateTodoAction}>save changes</button>
          <button id={id} onClick={() => dispatch(closePopUp())}>exit without save</button>
        </div>
      </PopUp>
    </div>
  )
}