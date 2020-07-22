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
      <div className="subject_name">
        {name}
      </div>
      <div className="subject_week">
        {week}
      </div>
      <div className="subject_teachers">
        {teachers[0]}
        {teachers[1]}
      </div>
      <div className="subject_labs">
        0/{labs}
      </div>
      <div className="subject_type">
        {type}
      </div>
    </div>
  )
}