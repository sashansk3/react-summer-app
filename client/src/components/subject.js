import React from 'react'

import {useDispatch} from 'react-redux'

import { openPopUp } from "../actions/action.subject"
import "../styles/subject.scss"

export default function Subject(props){
  const 
    dispatch = useDispatch(),
    openPopUpAction = () => dispatch(openPopUp(props.subject))

  let {labs, name, week} = props.subject
  return (
    <div className="subject" onClick={openPopUpAction}>
      <div className="subject_name">
        {name}
      </div>
      <div className="subject_labs">
        0/{labs}
      </div>
      <div className={`subject_week`}>
        <h6>week:</h6>
        <text className={`subject_week__${week}`}>{week}</text>
      </div>
    </div>
  )
}