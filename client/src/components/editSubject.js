import React, { useState } from "react"
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { updateSubject, setType, setWeek, setName, setLabs } from "../actions/action.subject"
import "../styles/addSubject.scss"

export default function EditSubject() {
  const dispatch = useDispatch()
  const user     = useSelector(store => store.user.user, shallowEqual)
  const id       = useSelector(store => store.subjects.showSubject.id, shallowEqual)
  const week     = useSelector(store => store.subjects.showSubject.week, shallowEqual)
  const teachers = useSelector(store => store.subjects.showSubject.teachers, shallowEqual)
  const name     = useSelector(store => store.subjects.showSubject.name, shallowEqual)
  const labs     = useSelector(store => store.subjects.showSubject.labs, shallowEqual)
  const type     = useSelector(store => store.subjects.showSubject.type, shallowEqual)

  const [page, changePage] = useState(false)
  
  const setNameAction = e => dispatch(setName(e.target.value))
  const setLabsAction = e => dispatch(setLabs(e.target.value))
  const setTypeAction = e => dispatch(setType(e.target.value))
  const setWeekAction = e => dispatch(setWeek(e.target.value))

  const updateSubjectAction = (e) => {
    let teachers = Object.values(document.getElementsByClassName("newSubject-teacher")).map(teacher => teacher.value.trim()).filter(Boolean)
    dispatch(updateSubject(teachers))
    changePage(true)
  }

  if(!Object.keys(user).length)
    return <Redirect to="/"/>
  else if(page || !id)
    return <Redirect to="/subjects"/>

  return(
    <div className="addSubject">
      <input className="newSubject-name" name="name" onChange={setNameAction} placeholder="Name" value={name}/>
      <div className="teachers">
        {
          teachers.map((teacher, id) => {
            return(
              <div class="teacher-container" id={"cont" + id}>
                <input class="newSubject-teacher" placeholder="Teacher" defaultValue={teacher}/>
                <button class="deleteTeacher" id={id} onClick={deleteTeacher}>-</button>
              </div>
            )
          })
        }
        <button className="addTeacher" onClick={addTeacher}>+</button>
      </div>

      <select name="week" className="newSubject-week" onChange={setWeekAction} value={week}>
        <option value="all">all weeks</option>
        <option value="even">even week</option>
        <option value="odd">odd week</option>
      </select>

      <select name="type" className="newSubject-type" onChange={setTypeAction} value={type}>
        <option value="exam">exam</option>
        <option value="test">test</option>
      </select>

      <input className="newSubject-labs" name="labs" onChange={setLabsAction} placeholder="Count of labs" value={labs}/>
      <button className="addNewSubject" onClick={updateSubjectAction} action="cont">Update and close</button>
      <button className="addNewSubject" onClick={() => changePage(true)} action="end">Close</button>
    </div>
  )
}

const addTeacher = () => {
  let newId = document.getElementsByClassName("teacher-container").length
  let newTeacher = `
    <div class="teacher-container" id="cont${newId}">
      <input class="newSubject-teacher" placeholder="Teacher"/>
      <button class="deleteTeacher" id="${newId}">-</button>
    </div>
  `
  let button = document.getElementsByClassName("addTeacher")[0]
  button.insertAdjacentHTML("beforebegin", newTeacher)
  let newElem = document.getElementsByClassName("deleteTeacher")[newId]
  newElem.onclick = deleteTeacher
}

const deleteTeacher = e => document.getElementById("cont" + e.target.id).remove()