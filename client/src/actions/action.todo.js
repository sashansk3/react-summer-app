import axios from 'axios';
import {SERVER_ADDRESS} from "../config/app.conf"


export const SET_TODOS = 'SET_TODOS'
export function setTodos(arr){
  return{
    type   : SET_TODOS,
    payload: arr
  }
}

export const SET_TEMP_TODOS = 'SET_TEMP_TODOS'
export function setTempTodos(arr){
  return{
    type   : SET_TEMP_TODOS,
    payload: arr
  }
}

export const SET_TODO_TITLE = 'SET_TODO_TITLE'
export function setTodoTitle(e){
  let title = e.target.value
  return{
    type   : SET_TODO_TITLE,
    payload: title
  }
}

export const SET_TODO_DEADLINE = 'SET_TODO_DEADLINE'
export function setTodoDeadline(e){
  let deadline = e.target.value
  return{
    type   : SET_TODO_DEADLINE,
    payload: deadline
  }
}

export const SET_TODO_STATUS = 'SET_TODO_STATUS'
export function setTodoStatus(e){
  let status = e.target.value
  return{
    type   : SET_TODO_STATUS,
    payload: status
  }
}

export const DROP_TODO = 'DROP_TODO'
export function dropTodo(){
  return{
    type: DROP_TODO,
  }
}

export const SET_EDIT_TODO = 'SET_EDIT_TODO'
export function setEditTodo(editTodo){
  return{
    type    : SET_EDIT_TODO,
    id      : editTodo.id,
    title   : editTodo.title,
    deadline: editTodo.deadline,
    status  : editTodo.status,
  }
}

export const OPEN_POPUP = 'OPEN_POPUP'
export function openPopUp(id){
  return (dispatch, getState) => {
    let todo = getState().todos.todos.find(todo => todo.id === +id)
    dispatch(setEditTodo(todo))
    dispatch({type: OPEN_POPUP})
  }
}

export const CLOSE_POPUP = 'CLOSE_POPUP'
export function closePopUp(){
    return {type: CLOSE_POPUP}
}

export const completeTodo = todoId => {
  return (dispatch, getState) => {
    const 
      todos = getState().todos.todos,
      todo  = todos.find(todo => todo.id === +todoId);
    console.log(todo)
    todo.status = !todo.status
    dispatch(setEditTodo(todo))
    dispatch(updateTodo())
  }
}

export const searchTodo = subStr => {
  return (dispatch, getState) => {
    let tempTodos = getState().todos.tempTodos
    if(subStr === ""){
      dispatch(setTempTodos([]))
      dispatch(setTodos(tempTodos))
    }
    else{
      const todos = getState().todos.todos
      let newTodos = todos.filter(todo => todo.title.toLowerCase().includes(subStr))
      if(tempTodos.length === 0)
        dispatch(setTempTodos(todos))
      dispatch(setTodos(newTodos))
    }
  }
}

export const filterTodo = type => {
  return (dispatch, getState) => {
    let todos = getState().todos.todos.sort((a, b) => {
      if (a[type] > b[type])
        return 1
      else if (a[type] < b[type])
        return -1
      else
        return 0
    })

    dispatch(setTodos(todos))
  }
}

export function getTodos(userId){
  return dispatch => {
    axios
      .get(`${SERVER_ADDRESS}/todos`,{
        params: {userId}
      })
      .then(res => {
        dispatch(setTodos(res.data))
        return res.data
      })
      .catch(err => {
        window.alert(err)
      })
    }
}

export function deleteTodo(todoId){
  return (dispatch, getState) => {
    axios.delete(`${SERVER_ADDRESS}/todos/:${todoId}`)
      .then(res => {
        const todos = getState().todos.todos
        let newTodos = todos.filter(todo => todo.id !== +todoId)
        dispatch(setTodos(newTodos))
      })
      .catch(err => {
        window.alert(err)
      })
  }
}

export function updateTodo(){
  return (dispatch, getState) => {
    const todos = getState().todos.todos
    let todo = {
      userId  : getState().user.user.id,
      id      : getState().todos.id,
      title   : getState().todos.title.trim(),
      deadline: getState().todos.deadline || "-",
      status  : getState().todos.status,
    }

    axios
      .put(`${SERVER_ADDRESS}/todos/:${todo.id}`, {todo})
      .then(res => {
        let id = todos.findIndex(elem => elem.id === todo.id)
        todos.splice(id, 1, todo)
        dispatch(setTodos(todos))
        dispatch(dropTodo())
        dispatch(closePopUp())
      })
      .catch(err => {
        window.alert(err)
      })    
  }
}


export function addTodo(){
  return (dispatch, getState) => {
    const todos = getState().todos.todos
    let todo = {
      userId  : getState().user.user.id,
      title   : getState().todos.title.trim(),
      deadline: getState().todos.deadline || "-",
      status  : getState().todos.status,
    }

    if(todo.title === ""){
      window.alert("Empty title")
    }
    else if(todos.find(elem => elem.title === todo.title)){
      window.alert("Todo with this title already exist")
    }
    else if(new Date(todo.deadline) - new Date() < -86400000){
      window.alert("Incorrect Date")
    }
    else{
      axios
        .post(`${SERVER_ADDRESS}/todos`, {todo})
        .then(res => {
          todo.id = res.data.id
          todos.push(todo)
          dispatch(setTodos(todos))
          dispatch(dropTodo())
        })
        .catch(err => {
          window.alert(err)
        })
    }
  }
}