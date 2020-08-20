import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import Lab from './lab'
import { closeLabPopUp, setEditFlag } from '../actions/labs.actions'
import { getSubjects } from '../actions/action.subject'
import EditAddLab from './editAddLab'
import PopUp from './popup'
import "../styles/labs.scss"

export default function Labs() {
  const
    dispatch = useDispatch(),
    subjects = useSelector(store => store.subjects.subjects, shallowEqual),
    editFlag = useSelector(store => store.labs.editFlag, shallowEqual),
    isOpen   = useSelector(store => store.labs.isOpen, shallowEqual),
    lab      = useSelector(store => store.labs.lab, shallowEqual);

  useEffect(() => {
    dispatch(getSubjects())
  }, [dispatch])

  const mapedSubjects = subjects.map(subject => {
    const mappedLabs = subject.Laboratories
      .sort((a, b) => a.number > b.number ? 1 : -1)
      .map(lab => <Lab key={lab.id} lab={lab} />)

    return (
      <div key={subject.id} className="labs_wrapper">
        {subject.name}
        <div className="labs_wrapper_list">
          {mappedLabs}
          <button
            className = {`labs_add-btn`}
            data-id   = {subject.id}
            onClick={() => dispatch(setEditFlag("add"))}
          >
            +{/* ➕ */}
          </button>
        </div>
      </div>
    )
  })

  return (
    <div className="labs">
      {mapedSubjects}

      <PopUp
        isOpen={isOpen}
        close={() => dispatch(closeLabPopUp())}
      >
        {editFlag
          ?(
            <EditAddLab />
          )
          :(
            <div className="labs_popup">
              Number 
              <label>{lab.number}</label>
              Date
              <label>{lab.date || "-"}</label>
              Points
              <label>{lab.points || "-"} / {lab.max_points || "-"}</label>
              Status
              <label>{lab.status}</label>
              <button className="labs_popup_edit-btn" onClick={() => dispatch(setEditFlag("edit"))}>edit</button>
              <button className="labs_popup_delete-btn" onClick={() => alert("Not work now")}>delete</button>
            </div>
          )
        }
      </PopUp>
    </div>
  )
}