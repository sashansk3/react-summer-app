import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from "react-redux"

import Subject from './subject'
import { getSubjects, closePopUp, setEditFlag } from "../actions/action.subject"
import "../styles/subjects.scss"

export default function Subjects() {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getSubjects()), [])

  const 
    subjects = useSelector(store => store.subjects.subjects, shallowEqual),
    editFlag = useSelector(store => store.subjects.editFlag, shallowEqual);

  const redirectToAddSubject = () => dispatch(setEditFlag("add"))

  if(editFlag === "add")
    return <Redirect to="/subjects/add"/>
  else if(editFlag === "edit"){
    dispatch(closePopUp())
    return <Redirect to="/subjects/edit"/>
  }
  return (
    <div className="subjects">
      <div className="subjects-filters">
        <button onClick={redirectToAddSubject}> add Subject </button>
      </div>

      <div className="subjects-list">
        {subjects.map(subject => 
          <Subject 
            key     = {subject.id}
            subject = {subject}
          />
        )}
      </div>

      <div className="subjects_content">

      </div>
    </div>
  )
}