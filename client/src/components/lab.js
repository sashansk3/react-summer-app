import React from 'react'
import { useDispatch } from 'react-redux'

import { openLabPopUp } from '../actions/labs.actions'
import "../styles/lab.scss"
export default function Lab({lab}) {
  const dispatch = useDispatch()

  const openLabPopUpAction = () => dispatch(openLabPopUp(lab))

  return (
    <div className={`lab lab__${lab.status}`} onClick={openLabPopUpAction}>
    </div>
  )
}