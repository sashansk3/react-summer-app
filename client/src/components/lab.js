import React from 'react'
import {useDispatch} from 'react-redux'

import {openPopUp} from '../actions/labs.actions'
import"../styles/lab.scss"
export default function Lab(props) {
  const dispatch = useDispatch()

  const openPopUpAction = () => dispatch(openPopUp(props.lab))

  let style = "default"
  if(props.lab.status === "inProgress"){
    style = "yellow"
  }
  else if(props.lab.status === "completed"){
    style = "green"
  }

  return (
    <div className={"lab back"+style} onClick={openPopUpAction}>
    </div>
  )
}