import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from "react-redux"

import Subject from './subject'
import PopUp from './popup';
import { getSubjects, closePopUp, deleteSubject, setEditFlag } from "../actions/action.subject"
import "../styles/subjects.scss"

export default function Subjects() {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getSubjects()), [])
  
  const 
    isOpenFlag = useSelector(store => store.subjects.isOpen, shallowEqual),
    subjects   = useSelector(store => store.subjects.subjects, shallowEqual),
    editFlag   = useSelector(store => store.subjects.editFlag, shallowEqual),
    subject    = useSelector(store => store.subjects.subject, shallowEqual);

  const 
    redirectToAddSubject  = () => dispatch(setEditFlag("add")),
    redirectToEditSubject = () => dispatch(setEditFlag("edit"));

  if(editFlag === "add")
    return <Redirect to="/subjects/add"/>
  else if(editFlag === "edit"){
    dispatch(closePopUp())
    return <Redirect to="/subjects/edit"/>
  }

  let mapSubjects = subjects.map(subject => <Subject key = {subject.id} subject = {subject}/>)
  return (
    <div className="subjects">
      <div className="subjects-filters">
        <button onClick={redirectToAddSubject}> add Subject </button>
      </div>
      <div className="subjects-list">
        {mapSubjects}
      </div>
      <PopUp
        isOpen = {isOpenFlag}
        close  = {() => dispatch(closePopUp())}
      >
        <div className="popup-subject">
          <div className="popup-subject-header">
            <div className="popup-subject-week">
              week: {subject.week}
            </div>
          </div>
          <div className="popup-subject-content">
            <div className="popup-subject-teachers">
              {subject.teachers?subject.teachers.map(teacher => <p>{teacher}</p>):""}
            </div>
          </div>
          <div className="popup-subject-name">
            {subject.name}
          </div>
          <div className="popup-subject-footer">
            <div className="popup-subject-labs">
              0/{subject.labs}
            </div>
            <div className="popup-subject-type">
              Type: {subject.type}
            </div>
            <div className="popup-subject-buttons">
              <button className="deleteBtn" onClick={() => dispatch(deleteSubject())}>delete</button>
              <button className="eeditBtn" onClick={redirectToEditSubject}>edit</button>
            </div>
          </div>
        </div>
      </PopUp>
    </div>
  )
}