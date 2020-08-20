import React from 'react'

import {useDispatch} from 'react-redux'

import { setSubject } from "../actions/action.subject"
import "../styles/subject.scss"

export default function Subject(props){
  const dispatch = useDispatch()

  let {labs, name, week} = props.subject
  return (
    <div className="subject" onClick={() => dispatch(setSubject(props.subject))}>
      <div className="subject_name">
        {name}
      </div>
      <div className="subject_labs">
        0/{labs} labs
      </div>
      <div className={`subject_week`}>
        <h6>week:</h6>
        <text className={`subject_week__${week}`}>{week}</text>
      </div>
    </div>
  )
}