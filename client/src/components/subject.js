import React from 'react'

import {useDispatch} from 'react-redux'

import { openPopUp } from "../actions/action.subject"
import "../styles/subject.scss"

export default function Subject(props){
  const 
    dispatch = useDispatch(),
    openPopUpAction = () => dispatch(openPopUp(props.subject))

  let {labs, name, teachers, type, week} = props.subject
  return (
    <div className="subject" onClick={openPopUpAction}>
      <div className="subject-header">
        <div className="subject-week">
          {week}
        </div>
      </div>
      <div className="subject-content">
        <div className="subject-teachers">
          <p>{teachers[0]}</p>
        </div>
        <div className="subject-name">
          {name}
        </div>
      </div>
      <div className="subject-footer">
        <div className="subject-labs">
          0/{labs}
        </div>
        <div className="subject-type">
          {type}
        </div>
      </div>
    </div>
  )
}