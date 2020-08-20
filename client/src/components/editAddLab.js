import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { closeLabPopUp, setDate, setMaxPoints, setPoints, setStatus, updateLab } from '../actions/labs.actions'
import "../styles/editAddLab.scss"

export default function EditAddLab() {
  const
    dispatch = useDispatch(),
    editFlag = useSelector(store => store.labs.editFlag, shallowEqual),
    lab      = useSelector(store => store.labs.lab, shallowEqual);

  const
    setDateAction      = e => dispatch(setDate(e.target.value)),
    setMaxPointsAction = e => dispatch(setMaxPoints(e.target.value)),
    setPointsAction    = e => dispatch(setPoints(e.target.value)),
    setStatusAction    = status => dispatch(setStatus(status));

  return (
    <div className="edit-add_popup">
      Points
      <input
        value={lab.points}
        onChange={setPointsAction}
      />
      Max points
      <input
        value={lab.max_points}
        onChange={setMaxPointsAction}
      />
      Date
      <input
        type="date"
        value={lab.date}
        onChange={setDateAction}
      />
      Status
      <div className="edit-add_status-btns">
        {setChoiseBtns(lab.status, setStatusAction)}
      </div>
      <button className="edit-add_update-btn" onClick={() => dispatch(updateLab())}>{editFlag=="edit"?"Update":"Add"}</button>
      <button className="edit-add_close-btn" onClick={() => dispatch(closeLabPopUp())}>Close</button>
    </div>
  )
}

const setChoiseBtns = (currentStatus, setStatus) => {
  const buttons = ["complete", "inProgress", "failed"]
  return buttons.map(button => {
    let active = ""
    if(currentStatus === button)
      active = "active"
    return(
      <div 
        className={`popup_status-button__${button} ${active}`}
        onClick={() => setStatus(button)}
      >
      </div>
    )
  }
  )
}