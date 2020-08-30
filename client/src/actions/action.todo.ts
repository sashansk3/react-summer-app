import axios from 'axios'
import { batch } from 'react-redux'
import { SERVER_ADDRESS } from '../config/app.conf'
import { setMessage } from './message.action'
import { TodoInterface } from '../types/todos'

export const SET_TODOS = 'SET_TODOS'
export const setTodos = (todos: any[]) => ({ type: SET_TODOS, payload: todos })

export const SET_TEMP_TODOS = 'SET_TEMP_TODOS'
export const setTempTodos = (tempTodos: []) => ({ type: SET_TEMP_TODOS, payload: tempTodos })

export const handleTodoChange = (value: string, field: string) => {
  return (dispatch: any, getState: any) => {
    let todo = getState().todos.todo
    todo[field] = value
    dispatch(setTodo(todo))
  }
}

export const SET_TODO = 'SET_TODO'
export const setTodo = (todo: TodoInterface) => ({ type: SET_TODO, payload: todo })

export const SHOW_TODO = 'SHOW_TODO'
export const showTodo = (id: number | null) => {
  return (dispatch: any, getState: any) => {
    let todo = getState().todos.todos.find((todo: any) => todo.id === id)
    const clearTodo: TodoInterface = {
      id: null,
      title: '',
      content: '',
      deadline: '',
      status: false,
    }
    batch(() => {
      dispatch(setTodo(clearTodo))
      dispatch(closeEditTodo())
      dispatch(setTodo(todo))
    })
  }
}

export const EDIT_TODO = 'EDIT_TODO'
export const editTodo = () => ({ type: EDIT_TODO })

export const dropTodo = () => {
  return (dispatch: any) => {
    const clearTodo: TodoInterface = {
      id: null,
      title: '',
      content: '',
      deadline: '',
      status: false,
    }
    dispatch(setTodo(clearTodo))
  }
}

export const ADD_TODO_FORM = 'ADD_TODO_FORM'
export const addTodoForm = () => {
  return (dispatch: any) => {
    batch(() => {
      dispatch(dropTodo())
      dispatch({ type: ADD_TODO_FORM })
    })
  }
}

export const CLOSE_EDIT = 'CLOSE_EDIT'
export const closeEditTodo = () => ({ type: CLOSE_EDIT })

export const completeTodo = () => {
  return (dispatch: any, getState: any) => {
    const todo = getState().todos.todo
    todo.status = !todo.status
    dispatch(updateTodo())
  }
}

export const searchTodo = (subStr: string) => {
  return (dispatch: any, getState: any) => {
    let tempTodos = [...getState().todos.tempTodos]
    if (subStr === '') {
      dispatch(setTodos(tempTodos))
    } else {
      const todos = getState().todos.todos
      let newTodos = todos.filter((todo: any) => todo.title.toLowerCase().includes(subStr))

      if (tempTodos.length === 0) dispatch(setTempTodos(todos))

      dispatch(setTodos(newTodos))
    }
  }
}

export const filterTodo = (type: string) => {
  return (dispatch: any, getState: any) => {
    const todos = [...getState().todos.todos]
    //filter todos by value(type) of option
    let filteredTodos = todos.sort((a, b) => (a[type] > b[type] ? 1 : -1))

    dispatch(setTodos(filteredTodos))
  }
}

export function getTodos(userId: number) {
  return (dispatch: any) => {
    axios
      .get(`${SERVER_ADDRESS}/todos`, {
        params: { userId },
      })
      .then((res) => {
        dispatch(setTodos(res.data))
      })
      .catch((err) => {
        dispatch(setMessage(err, 'error'))
      })
  }
}

export function deleteTodo() {
  return (dispatch: any, getState: any) => {
    const id = getState().todos.todo.id
    axios
      .delete(`${SERVER_ADDRESS}/todos/:${id}`)
      .then((res) => {
        const todos = getState().todos.todos
        let newTodos = todos.filter((todo: any) => todo.id !== id)
        batch(() => {
          dispatch(setTodos(newTodos))
          dispatch(dropTodo())
        })
      })
      .catch((err) => {
        dispatch(setMessage(err, 'error'))
      })
  }
}

export function updateTodo() {
  return (dispatch: any, getState: any) => {
    const todos = [...getState().todos.todos]
    const todo = {
      userId: getState().user.user.id,
      ...getState().todos.todo,
    }

    const errMessage = validTodo(todo, todos)

    if (errMessage) {
      dispatch(setMessage(errMessage, 'error'))
      return 0
    }

    axios
      .put(`${SERVER_ADDRESS}/todos/:${todo.id}`, { todo })
      .then((res) => {
        let resultOfReq = res.data[0]
        if (resultOfReq) {
          let id = todos.findIndex((elem) => elem.id === todo.id)
          todos.splice(id, 1, todo)

          const message = 'Successfully updated'
          batch(() => {
            dispatch(setMessage(message, 'success'))
            dispatch(setTodos(todos))
            dispatch(closeEditTodo())
          })
        }
      })
      .catch((err) => {
        dispatch(setMessage(err, 'error'))
      })
  }
}

export function addTodo() {
  return (dispatch: any, getState: any) => {
    const todos = [...getState().todos.todos]
    let todo = {
      userId: getState().user.user.id,
      ...getState().todos.todo,
    }

    const errMessage = validTodo(todo, todos)

    if (errMessage) {
      dispatch(setMessage(errMessage, 'error'))
      return 0
    }

    axios
      .post(`${SERVER_ADDRESS}/todos`, { todo })
      .then((res) => {
        todo.id = res.data.id
        todos.push(todo)

        const message = 'Successfully added'

        batch(() => {
          dispatch(setMessage(message, 'success'))
          dispatch(setTodos(todos))
          dispatch(dropTodo())
        })
      })
      .catch((err) => {
        dispatch(setMessage(err, 'error'))
      })
  }
}

const validTodo = (todo: TodoInterface, todos: any) => {
  let errMessage = ''

  if (todo.title === '') {
    errMessage = 'Empty title'
  } else if (todos.find((elem: any) => elem.title === todo.title && elem.id !== todo.id)) {
    errMessage = 'Todo with same title already exist'
  }

  return errMessage
}
