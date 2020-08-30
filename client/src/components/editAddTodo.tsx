import React, { useRef, useEffect, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { addTodo, updateTodo, handleTodoChange, closeEditTodo } from '../actions/action.todo'
import '../styles/editAddTodo.scss'
import { RootState } from '../reducers'
const EditAddTodo = () => {
  const dispatch = useDispatch()
  const refTextArea = useRef<HTMLTextAreaElement>(null)
  const action = useSelector((store: RootState) => store.todos.editFlag, shallowEqual)
  const title = useSelector((store: RootState) => store.todos.todo.title, shallowEqual)
  const content = useSelector((store: RootState) => store.todos.todo.content, shallowEqual)
  const deadline = useSelector((store: RootState) => store.todos.todo.deadline, shallowEqual)
  const status = useSelector((store: RootState) => store.todos.todo.status, shallowEqual)
  const addTodoAction = useCallback(() => {
    dispatch(addTodo())
  }, [dispatch])
  const updateTodoAction = useCallback(() => {
    dispatch(updateTodo())
  }, [dispatch])

  useEffect(() => {
    const onKeypressAddTodo = (e: any) => {
      if (e.keyCode === 13 && e.shiftKey) action === 'add' ? addTodoAction() : updateTodoAction()
    }
    document.addEventListener('keypress', onKeypressAddTodo)
    return () => {
      document.removeEventListener('keypress', onKeypressAddTodo)
    }
  }, [action, addTodoAction, updateTodoAction])
  const handleTodoChangeAction = (e: any) => {
    const that = e.target,
      value = that.value,
      field = that.dataset.field
    dispatch(handleTodoChange(value, field))
  }

  const changeSize = () => {
    let that = refTextArea.current!
    if (that.scrollTop > 0) {
      that.style.height = that.scrollHeight + 'px'
    }
  }
  return (
    <div className="todo_editAdd">
      <label>Title</label>
      <input
        data-field="title"
        placeholder="Title"
        maxLength={40}
        onChange={handleTodoChangeAction}
        value={title}
      />
      <label>Content</label>
      <textarea
        ref={refTextArea}
        data-field="content"
        placeholder="Content"
        maxLength={300}
        onChange={handleTodoChangeAction}
        onInput={changeSize}
        value={content}
      />
      <label>Deadline</label>
      <input
        data-field="deadline"
        placeholder="Deadline"
        onChange={handleTodoChangeAction}
        min={new Date().toISOString().split('T')[0]}
        value={deadline}
        type="date"
      />
      <label>Status</label>
      <input
        data-field="status"
        placeholder="Status"
        onChange={handleTodoChangeAction}
        value={status}
        checked={status}
        type="checkbox"
      />
      <button
        className="todo_updateBtn"
        onClick={action === 'add' ? addTodoAction : updateTodoAction}
      >
        {action === 'add' ? 'Add' : 'Update'}
      </button>
      <button className="todo_closeBtn" onClick={() => dispatch(closeEditTodo())}>
        Close
      </button>
    </div>
  )
}

export default EditAddTodo
