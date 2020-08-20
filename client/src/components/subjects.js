import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from "react-redux"

import Subject from './subject'
import { getSubjects, setEditFlag } from "../actions/action.subject"
import "../styles/subjects.scss"

export default function Subjects() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSubjects())
  }, [dispatch])

  const
    subjects = useSelector(store => store.subjects.subjects, shallowEqual),
    subject = useSelector(store => store.subjects.subject, shallowEqual),
    editFlag = useSelector(store => store.subjects.editFlag, shallowEqual);

  const redirectToAddSubject = () => dispatch(setEditFlag("add"))
  const redirectToEditSubject = () => dispatch(setEditFlag("edit"))

  if (editFlag === "add")
    return <Redirect to="/subjects/add" />
  else if (editFlag === "edit") {
    return <Redirect to="/subjects/edit" />
  }

  return (
    <div className="subjects">
      <div className="subjects_filters">
        <button onClick={redirectToAddSubject}> add Subject </button>
      </div>

      <div className="subjects_list">
        <h1>Subjects list</h1>
        {subjects.map(subject =>
          <Subject
            key={subject.id}
            subject={subject}
          />
        )}
      </div>

      <div className="subjects_content">
        <h1>Subject</h1>
        {
          subject.id
            ? (
              <React.Fragment>
                <p><b>Name:</b>{subject.name}</p>
                <p><b>Week:</b>{subject.week}</p>
                <p><b>Type:</b>{subject.type}</p>
                <b>Teachers:</b>
                <div>
                  {subject.teachers.map(teacher => <p>{teacher}</p>)}
                </div>
                <p><b>Labs count:</b>{subject.labs}</p>
                <div>
                  <button className="subjects_editBtn" onClick={redirectToEditSubject}>Edit</button>
                  <button className="subjects_deleteBtn">Delete</button>
                </div>
              </React.Fragment>
            )
            : "Chose subject to see information"
        }
      </div>
    </div>
  )
}