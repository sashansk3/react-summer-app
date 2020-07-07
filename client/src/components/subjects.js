import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from "react-redux"

import Subject from './subject'
import PopUp from './popup';
import { getSubjects, closePopUp, deleteSubject } from "../actions/action.subject"
import "../styles/subjects.scss"

export default function Subjects() {
  const [redirectUrl, setRedirectUrl] = useState("")
  const dispatch = useDispatch()
  useEffect(() => {dispatch(getSubjects())}, [])
  
  const isOpenFlag  = useSelector(store => store.subjects.isOpen, shallowEqual)
  const showSubject = useSelector(store => store.subjects.showSubject, shallowEqual)
  const subjects    = useSelector(store => store.subjects.subjects, shallowEqual)

  const 
    redirectToAddSubject  = () => setRedirectUrl("/subjects/add"),
    redirectToEditSubject = () => setRedirectUrl("/subjects/edit");

  if(redirectUrl === "/subjects/add")
    return <Redirect to="/subjects/add"/>
  else if(redirectUrl === "/subjects/edit"){
    dispatch(closePopUp())
    return <Redirect to="/subjects/edit"/>
  }

  let mapSubjects = subjects.map(subject => <Subject key = {subject.id} subject = {subject}/>)
  return (
    <div className="subjects">
      <div className="subjects-filters">
        <button onClick={redirectToAddSubject}> add Subject </button>
      </div>
      <div className="listOfSubjects">
        {mapSubjects}
      </div>
      <PopUp
        isOpen = {isOpenFlag}
        close  = {() => dispatch(closePopUp())}
      >
        <div className="popup-subject">
          <div className="popup-subject-header">
            <div className="popup-subject-week">
              week: {showSubject.week}
            </div>
          </div>
          <div className="popup-subject-content">
            <div className="popup-subject-teachers">
              {showSubject.teachers?showSubject.teachers.map(teacher => <p>{teacher}</p>):""}
            </div>
          </div>
          <div className="popup-subject-name">
            {showSubject.name}
          </div>
          <div className="popup-subject-footer">
            <div className="popup-subject-labs">
              0/{showSubject.labs}
            </div>
            <div className="popup-subject-type">
              Type: {showSubject.type}
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