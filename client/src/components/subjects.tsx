import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import Subject from './subject'
import { getSubjects, setEditFlag, setSubject } from '../actions/action.subject'
import '../styles/subjects.scss'
import { RootState } from '../reducers'
import { SubjectInterface } from '../types/subjects'

export default function Subjects() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSubjects())
  }, [dispatch])

  const subjects = useSelector((store: RootState) => store.subjects.subjects, shallowEqual)
  const subject = useSelector((store: RootState) => store.subjects.subject, shallowEqual)
  const editFlag = useSelector((store: RootState) => store.subjects.editFlag, shallowEqual)

  if (editFlag === 'add') {
    return <Redirect to="/subjects/add" />
  } else if (editFlag === 'edit') {
    return <Redirect to="/subjects/edit" />
  }

  return (
    <div className="subjects">
      <div className="subjects_filters">
        <button onClick={() => dispatch(setEditFlag('add'))}> add Subject </button>
      </div>

      <div className="subjects_list">
        <h1>Subjects list</h1>
        {subjects.map((subject: SubjectInterface) => (
          <Subject
            key={subject.id}
            subject={subject}
            setSubject={(subject) => dispatch(setSubject(subject))}
          />
        ))}
      </div>

      <div className="subjects_content">
        <h1>Subject</h1>
        {subject.id ? (
          <React.Fragment>
            <p>
              <b>Name:</b>
              {subject.name}
            </p>
            <p>
              <b>Week:</b>
              {subject.week}
            </p>
            <p>
              <b>Type:</b>
              {subject.type}
            </p>
            <b>Teachers:</b>
            <div>
              {subject.teachers.map((teacher: string) => (
                <p>{teacher}</p>
              ))}
            </div>
            <p>
              <b>Labs count:</b>
              {subject.labs}
            </p>
            <div>
              <button className="subjects_editBtn" onClick={() => dispatch(setEditFlag('edit'))}>
                Edit
              </button>
              <button className="subjects_deleteBtn">Delete</button>
            </div>
          </React.Fragment>
        ) : (
          'Chose subject to see information'
        )}
      </div>
    </div>
  )
}
