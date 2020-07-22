import React, { useState } from "react"
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { addSubject, updateSubject, setType, setWeek, setName, setLabs, setTeacher, addTeacher, deleteTeacher, dropSubject } from "../actions/action.subject"
import {ReactComponent as TrashIcon} from "../utils/trash_bin.svg"
import "../styles/editAddSubject.scss"

export default function EditAddSubject() {
  const 
    dispatch = useDispatch(),
    editFlag = useSelector(store => store.subjects.editFlag, shallowEqual),
    week     = useSelector(store => store.subjects.subject.week, shallowEqual),
    teachers = useSelector(store => store.subjects.subject.teachers, shallowEqual),
    name     = useSelector(store => store.subjects.subject.name, shallowEqual),
    labs     = useSelector(store => store.subjects.subject.labs, shallowEqual),
    type     = useSelector(store => store.subjects.subject.type, shallowEqual);

  const [page, changePage] = useState(false)
  const 
    setNameAction    = e => dispatch(setName(e.target.value)),
    setLabsAction    = e => dispatch(setLabs(e.target.value)),
    setTypeAction    = e => dispatch(setType(e.target.value)),
    addTeacherAction = () => dispatch(addTeacher()),
    setWeekAction    = e => dispatch(setWeek(e.target.value));

  const setTeacherAction = e => {
    const 
      input = e.target,
      value = input.value,
      index = input.dataset.index;
    dispatch(setTeacher(index, value))
  }

  const deleteTeacherAction = e => dispatch(deleteTeacher(e.target.dataset.index))

  if(page) {
    dispatch(dropSubject())
    return <Redirect to="/subjects" />
  }

  const mappedTeachers = teachers.map((teacherName, id) =>{
    return(
      <React.Fragment key={id}>
        <input 
          data-index={id} 
          className="addEditSubject_teacher" 
          placeholder="Teacher Name" 
          value={teacherName} 
          onChange={setTeacherAction}
        />
        <button className="addEditSubject_delete-teacher" data-index={id} onClick={deleteTeacherAction}>
          <TrashIcon />
        </button>
      </React.Fragment>
    )
  })

  const updateSubjectAction = e => {
    let teachers = Object.values(document.getElementsByClassName("newSubject-teacher")).map(teacher => teacher.value.trim()).filter(Boolean)
    editFlag === "add"?dispatch(addSubject(teachers)):dispatch(updateSubject(teachers))
    changePage(true)
  }

  return(
    <div className="addEditSubject">
      <label>Name</label>
      <input 
        className="addEditSubject_name" 
        placeholder="Name" 
        onChange={setNameAction} 
        value={name}
      />

      <label>Teachers</label>
      <div className="addEditSubject_teachers">
        {mappedTeachers}
        <button className="addEditSubject_add-teacher" onClick={addTeacherAction}>Add new teacher</button>
      </div>

      <label>Week</label>
      <select 
        className="addEditSubject_week" 
        onChange={setWeekAction} 
        value={week}
      >
        <option value="all">all weeks</option>
        <option value="even">even week</option>
        <option value="odd">odd week</option>
      </select>

      <label>Type</label>
      <select 
      className="addEditSubject_type" 
      onChange={setTypeAction} 
      value={type}
      >
        <option value="exam">exam</option>
        <option value="test">test</option>
      </select>

      <label>Labs Count</label>
      <input 
        className="addEditSubject_labs"
        onChange={setLabsAction}
        placeholder="Count of labs"
        value={labs}
      />
      
      <button className="addEditSubject_add-subject" onClick={updateSubjectAction}>{editFlag === "add"?"Add":"Update"} and close</button>
      <button className="addEditSubject_close" onClick={() => changePage(true)}>Close</button>
    </div>
  )
}