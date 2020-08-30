import React from 'react'
import '../styles/subject.scss'

import { SubjectInterface } from '../types/subjects'

interface SubjectPropsInterface {
  subject: SubjectInterface
  setSubject(subject: SubjectInterface): void
}

export default function Subject(props: SubjectPropsInterface) {
  let { labs, name, week } = props.subject
  let { setSubject } = props

  return (
    <div className="subject" onClick={() => setSubject(props.subject)}>
      <div className="subject_name">{name}</div>
      <div className="subject_labs">0/{labs} labs</div>
      <div className={`subject_week`}>
        <h6>week:</h6>
        <span className={`subject_week__${week}`}>{week}</span>
      </div>
    </div>
  )
}
