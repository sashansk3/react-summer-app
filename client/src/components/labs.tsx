import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import Lab from './lab'
import PopUp from './popup'
import EditAddLab from './editAddLab'

import { closeLabPopUp, setEditFlag, openLabPopUp } from '../actions/labs.actions'
import { getSubjects } from '../actions/action.subject'

import { RootState } from '../reducers'
import { LabInterface } from '../types/labs'

import '../styles/labs.scss'

export default function Labs() {
  const dispatch = useDispatch()
  const subjects = useSelector((store: RootState) => store.subjects.subjects, shallowEqual)
  const editFlag = useSelector((store: RootState) => store.labs.editFlag, shallowEqual)
  const isOpen = useSelector((store: RootState) => store.labs.isOpen, shallowEqual)
  const lab = useSelector((store: RootState) => store.labs.lab, shallowEqual)

  useEffect(() => {
    dispatch(getSubjects())
  }, [dispatch])

  const mapedSubjects = subjects.map((subject: any) => {
    const mappedLabs = subject.Laboratories.sort((a: any, b: any) => {
      return a.number > b.number ? 1 : -1
    }).map((lab: LabInterface) => {
      return <Lab key={lab.id} lab={lab} openPopUp={(lab) => dispatch(openLabPopUp(lab))} />
    })

    return (
      <div key={subject.id} className="labs_wrapper">
        {subject.name}
        <div className="labs_wrapper_list">
          {mappedLabs}
          <button
            className={`labs_add-btn`}
            data-id={subject.id}
            onClick={() => dispatch(setEditFlag('add'))}
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

      <PopUp isOpen={isOpen} close={() => dispatch(closeLabPopUp())}>
        {editFlag ? (
          <EditAddLab />
        ) : (
          <div className="labs_popup">
            Number
            <label>{lab.number}</label>
            Date
            <label>{lab.date || '-'}</label>
            Points
            <label>
              {lab.points || '-'} / {lab.max_points || '-'}
            </label>
            Status
            <label>{lab.status}</label>
            <button className="labs_popup_edit-btn" onClick={() => dispatch(setEditFlag('edit'))}>
              edit
            </button>
            <button className="labs_popup_delete-btn" onClick={() => alert('Not work now')}>
              delete
            </button>
          </div>
        )}
      </PopUp>
    </div>
  )
}
