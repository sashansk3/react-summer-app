import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import Todo from './todo'
import EditAddTodo from './editAddTodo'
import {
  searchTodo,
  filterTodo,
  getTodos,
  deleteTodo,
  completeTodo,
  editTodo,
  addTodoForm,
  showTodo,
} from '../actions/action.todo'

import { RootState } from '../reducers'
import { TodoInterface } from '../types/todos'

import '../styles/todos.scss'

export default function Todos() {
  const dispatch = useDispatch()
  const user = useSelector((store: RootState) => store.user.user, shallowEqual)
  const todos = useSelector((store: RootState) => store.todos.todos, shallowEqual)
  const todo = useSelector((store: RootState) => store.todos.todo, shallowEqual)
  const editFlag = useSelector((store: RootState) => store.todos.editFlag, shallowEqual)

  useEffect(() => {
    dispatch(getTodos(user.id))
  }, [dispatch, user.id])

  const searchTodoAction = (e: any) => {
    let subStr = e.target.value.toLowerCase()
    dispatch(searchTodo(subStr))
  }

  const filterTodoAction = (e: any) => {
    let type = e.target.value
    dispatch(filterTodo(type))
  }

  let mapedTodos = todos.map((todo: TodoInterface) => {
    return <Todo key={todo.id} todo={todo} showTodo={(id) => dispatch(showTodo(id))} />
  })
  if (mapedTodos.length === 0) {
    mapedTodos = <p>You haven't todo, add todo please</p>
  }

  return (
    <div className="todos">
      <div className="todos-filters">
        <section>
          <input
            className="filterTodo"
            onChange={searchTodoAction}
            placeholder="Search"
          />
          sort by:
          <select className="todos-filters__select" onChange={filterTodoAction}>
            <option value="deadline">date</option>
            <option value="status">status</option>
            <option value="title">title</option>
          </select>
        </section>
        <button className="todos_addBtn" onClick={() => dispatch(addTodoForm())}>
          +
        </button>
      </div>

      <div className="todos-overview">
        <div className="todos-list">
          <h1>Todo list</h1>
          {mapedTodos}
        </div>

        <div className="todo_content">
          <h1>Todo</h1>
          {editFlag ? (
            <EditAddTodo />
          ) : todo.id ? (
            <React.Fragment>
              <p>
                <b>Title:</b>
                {todo.title}
              </p>
              <p>
                <b>Content:</b>
                {todo.content}
              </p>
              <p>
                <b>Deadline:</b>
                {todo.deadline}
              </p>
              <p>
                <b>Status:</b>
                {todo.status ? 'Todo compleated' : 'Todo not compleated'}
              </p>
              <div>
                <button className="todo_editBtn" onClick={() => dispatch(editTodo())}>
                  Edit
                </button>
                <button className="todo_deleteBtn" onClick={() => dispatch(deleteTodo())}>
                  Delete
                </button>
                <button
                  className="todo_comleteBtn"
                  onClick={() => dispatch(completeTodo())}
                >
                  {todo.status ? 'Start again' : 'Complete'}
                </button>
              </div>
            </React.Fragment>
          ) : (
            'Chose todo to see information'
          )}
        </div>
      </div>
    </div>
  )
}
