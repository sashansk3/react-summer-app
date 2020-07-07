import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector, shallowEqual} from 'react-redux'

import Lab from './lab'
import { closePopUp, setDate, setMaxPoints, setPoints, setStatus, updateLab } from '../actions/labs.actions'
import { getSubjects } from '../actions/action.subject'
import PopUp from './popup'
import "../styles/labs.scss"

export default function Labs() {
  const dispatch = useDispatch()
  const subjects = useSelector(store => store.subjects.subjects, shallowEqual)
  const isOpen   = useSelector(store => store.labs.isOpen, shallowEqual)
  const showLab  = useSelector(store => store.labs.showLab, shallowEqual)
  const status  = useSelector(store => store.labs.showLab.status, shallowEqual)
  const [editLab, startEditLab] = useState(false)
  useEffect(() => {dispatch(getSubjects())}, [])
  const setDateAction      = e => dispatch(setDate(e.target.value))
  const setMaxPointsAction = e => dispatch(setMaxPoints(e.target.value))
  const setPointsAction    = e => dispatch(setPoints(e.target.value))
  const setStatusAction    = e => dispatch(setStatus(e.target.value))

  let mapedSubjects = subjects.map(subject => {
    let mappedLabs = subject.Laboratories
      .sort((a, b) => a.number > b.number ? 1 : -1)
      .map(lab => <Lab key = {lab.id} lab = {lab}/>)
    return(
      <div className="labs-containers">
        {subject.name}: {mappedLabs}<br/>
      </div>
    )
  })
  return (
    <div className="labs">
      {mapedSubjects}
      <PopUp
        isOpen = {isOpen}
        close  = {() => dispatch(closePopUp())}
      >
        {editLab
        ?(
          <div className="editLabsPopUp">
            <p>number: {showLab.number}</p>
            date: <input name="date" type="date" value={showLab.date} onChange={setDateAction}/><br/>
            points: <input name="points" type="text" value={showLab.points} onChange={setPointsAction}/><br/>
            max_points: <input name="max_points" type="text" value={showLab.max_points} onChange={setMaxPointsAction}/><br/>
            status: <select name="status" onChange={setStatusAction} value={status}>
              <option value="false">false</option>
              <option value="inProgress">inProgress</option>
              <option value="completed">completed</option>
            </select>
            <button onClick={() => dispatch(updateLab())}>update</button>
            <button onClick={() => dispatch(closePopUp())}>close</button>
          </div>
        )
        :(
          <div className="showLabsPopUp">
            <p>number: {showLab.number}</p>
            <p>date: {showLab.date || "-"}</p>
            <p>points: {showLab.points || "-"}</p>
            <p>max_points: {showLab.max_points || "-"}</p>
            <p>status: {showLab.status}</p>
            <button>delete</button>
            <button onClick={() => startEditLab(true)}>edit</button>
          </div>
        )
      }
      </PopUp>
    </div>
  )
}