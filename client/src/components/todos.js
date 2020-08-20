import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import Todo from "./todo"
import EditAddTodo from "./editAddTodo"
import { searchTodo, filterTodo, getTodos, deleteTodo, completeTodo, editTodo, addTodoForm} from "../actions/action.todo.js"
import "../styles/todos.scss"

export default function Todos(){
  const 
    dispatch = useDispatch(),
    user     = useSelector(store => store.user.user, shallowEqual),
    todos    = useSelector(store => store.todos.todos, shallowEqual),
    todo     = useSelector(store => store.todos.todo, shallowEqual),
    editFlag = useSelector(store => store.todos.editFlag, shallowEqual);

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
  
  let mapedTodos = todos.map(todo => <Todo key = {todo.id} todo = {todo}/>)
  if(mapedTodos.length === 0)
    mapedTodos = <p>You haven't todo, add todo please</p>

  return (
    <div className="todos">
      <div className="todos-filters">
        <section>
          <input className="filterTodo" onChange={searchTodoAction} placeholder="Search" />
          sort by:
          <select className="todos-filters__select" onChange={filterTodoAction}>
            <option value="deadline">date</option>
            <option value="status">status</option>
            <option value="title">title</option>
          </select>
        </section>
        <button className="todos_addBtn" onClick={() => dispatch(addTodoForm("add"))}>+</button>
      </div>

      <div className="todos-overview">
        <div className="todos-list">
          <h1>Todo list</h1>
          {mapedTodos}
        </div>
        
        <div className="todo_content">
          <h1>Todo</h1>
          {
            editFlag
            ?<EditAddTodo />
            :(
              todo.id
              ?(
              <React.Fragment>
                  <p><b>Title:</b>{todo.title}</p>
                  <p><b>Content:</b>{todo.content}</p>
                  <p><b>Deadline:</b>{todo.deadline}</p>
                  <p><b>Status:</b>{todo.status?"Todo compleated":"Todo not compleated"}</p>
                  <div>
                    <button className="todo_editBtn" onClick={() => dispatch(editTodo())}>Edit</button>
                    <button className="todo_deleteBtn" onClick={() => dispatch(deleteTodo())}>Delete</button>
                    <button className="todo_comleteBtn" onClick={() => dispatch(completeTodo())}>{todo.status?"Start again":"Complete"}</button>
                  </div>
                </React.Fragment>
              )
              :"Chose todo to see information"
            )
          }
        </div>
      </div>
    </div>
  )
}