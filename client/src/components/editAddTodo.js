import React, { useRef, useEffect } from "react"
import { useDispatch, useSelector, shallowEqual }  from "react-redux"
import { addTodo, updateTodo, handleTodoChange, closeEditTodo } from "../actions/action.todo.js"
import "../styles/editAdd.scss"

const EditAddTodo = props => {
  const 
    dispatch         = useDispatch(),
    refTextArea      = useRef(null),
    action           = useSelector(store => store.todos.editFlag, shallowEqual),
    title            = useSelector(store => store.todos.todo.title, shallowEqual),
    content          = useSelector(store => store.todos.todo.content, shallowEqual),
    deadline         = useSelector(store => store.todos.todo.deadline, shallowEqual),
    status           = useSelector(store => store.todos.todo.status, shallowEqual),
    addTodoAction    = () => dispatch(addTodo()),
    updateTodoAction = () => dispatch(updateTodo());

  useEffect(() => {
    const onKeypressAddTodo = e => {
      if(e.keyCode === 13 && e.shiftKey)
        action === "add"?addTodoAction():updateTodoAction()
    }
    document.addEventListener('keypress', onKeypressAddTodo)
    return () => {
      document.removeEventListener('keypress', onKeypressAddTodo)
    }
  }, [])
  const handleTodoChangeAction = e => {
    const 
      that = e.target,
      value = that.value,
      field = that.dataset.field;
    dispatch(handleTodoChange(value, field))
  }

  const changeSize = () => {
    let that = refTextArea.current
    if(that.scrollTop > 0){
      that.style.height = that.scrollHeight + "px"
    }
  }
  return (
    <div className="todo_editAdd">
      <label>Title</label>
      <input 
        data-field="title"
        placeholder="Title"
        onChange={handleTodoChangeAction}
        value={title}
      />
      <label>Content</label>
      <textarea 
        ref={refTextArea}
        data-field="content"
        placeholder="Content"
        onChange={handleTodoChangeAction}
        onInput={changeSize}
        value={content}
      />
      <label>Deadline</label>
      <input 
        data-field="deadline"
        placeholder="Deadline"
        onChange={handleTodoChangeAction}
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
      <button className="todo_updateBtn" onClick={action === "add"?addTodoAction:updateTodoAction}>{action === "add"?"Add":"Update"}</button>
      <button className="todo_closeBtn" onClick={() => dispatch(closeEditTodo())}>Close</button>
    </div>
  )
}

export default EditAddTodo