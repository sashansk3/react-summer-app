import React, { useState } from "react"
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setName, setLabs, setType, setWeek, addSubject } from "../actions/action.subject"
import "../styles/addSubject.scss"

export default function AddSubject(props) {
  const dispatch = useDispatch()
  const [page, changePage] = useState(false)
  const user = useSelector(store => store.user.user)

  const addSubjectAction = e => {
    let teachers = Object.values(document.getElementsByClassName("newSubject-teacher")).map(teacher => teacher.value.trim()).filter(Boolean)
    dispatch(addSubject(teachers))
  }
  const setNameAction = e => dispatch(setName(e.target.value))
  const setLabsAction = e => dispatch(setLabs(e.target.value))
  const setTypeAction = e => dispatch(setType(e.target.value))
  const setWeekAction = e => dispatch(setWeek(e.target.value))

  if(!Object.keys(user).length)
    return <Redirect to="/"/>
  else if(page)
    return <Redirect to="/subjects"/>

  return(
    <div className="addSubject">
      <input className="newSubject-name" onChange={setNameAction} placeholder="Name"/>
      <div className="teachers">
        <div class="teacher-container" id="cont0">
          <input class="newSubject-teacher" placeholder="Teacher"/>
          <button class="deleteTeacher" id="0" onClick={deleteTeacher}>-</button>
        </div>
        <button className="addTeacher" onClick={addTeacher}>+</button>
      </div>

      <select className="newSubject-week" onChange={setWeekAction}>
        <option value="all">all weeks</option>
        <option value="even">even week</option>
        <option value="odd">odd week</option>
      </select>

      <select className="newSubject-type" onChange={setTypeAction}>
        <option value="exam">exam</option>
        <option value="test">test</option>
      </select>

      <input className="newSubject-labs" onChange={setLabsAction} placeholder="Count of labs"/>

      <button className="addNewSubject" onClick={addSubjectAction} action="cont">add</button>
      <button className="addNewSubject" onClick={() => changePage(true)} action="end">close</button>
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