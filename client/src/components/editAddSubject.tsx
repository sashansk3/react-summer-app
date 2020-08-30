import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../reducers'

import {
  addSubject,
  updateSubject,
  setType,
  setWeek,
  setName,
  setLabs,
  setTeacher,
  addTeacher,
  deleteTeacher,
  dropSubject,
} from '../actions/action.subject'

import { ReactComponent as TrashIcon } from '../utils/trash_bin.svg'
import '../styles/editAddSubject.scss'

export default function EditAddSubject() {
  const dispatch = useDispatch()
  const editFlag = useSelector((store: RootState) => store.subjects.editFlag, shallowEqual)
  const week = useSelector((store: RootState) => store.subjects.subject.week, shallowEqual)
  const teachers = useSelector((store: RootState) => store.subjects.subject.teachers, shallowEqual)
  const name = useSelector((store: RootState) => store.subjects.subject.name, shallowEqual)
  const labs = useSelector((store: RootState) => store.subjects.subject.labs, shallowEqual)
  const type = useSelector((store: RootState) => store.subjects.subject.type, shallowEqual)

  const [page, changePage] = useState(false)
  const setNameAction = (e: any) => dispatch(setName(e.target.value)),
    setLabsAction = (e: any) => dispatch(setLabs(e.target.value)),
    setTypeAction = (e: any) => dispatch(setType(e.target.value)),
    addTeacherAction = () => dispatch(addTeacher()),
    setWeekAction = (e: any) => dispatch(setWeek(e.target.value))

  const setTeacherAction = (e: any) => {
    const input = e.target,
      value = input.value.trim(),
      index = input.dataset.index
    dispatch(setTeacher(index, value))
  }

  const deleteTeacherAction = (e: any) => dispatch(deleteTeacher(e.target.dataset.index))

  const updateSubjectAction = () => {
    editFlag === 'add' ? dispatch(addSubject()) : dispatch(updateSubject())
    changePage(true)
  }

  if (page) {
    dispatch(dropSubject())
    return <Redirect to="/subjects" />
  }

  const mappedTeachers = teachers.map((teacherName: string, id: number) => {
    return (
      <React.Fragment key={id}>
        <input
          data-index={id}
          className="addEditSubject_teacher"
          placeholder="Teacher Name"
          maxLength={50}
          value={teacherName}
          onChange={setTeacherAction}
        />
        <button
          className="addEditSubject_delete-teacher"
          data-index={id}
          onClick={deleteTeacherAction}
        >
          <TrashIcon />
        </button>
      </React.Fragment>
    )
  })

  return (
    <div className="addEditSubject">
      <label>Name</label>
      <input
        className="addEditSubject_name"
        placeholder="Name"
        maxLength={30}
        onChange={setNameAction}
        value={name}
      />

      <label>Teachers</label>
      <div className="addEditSubject_teachers">
        {mappedTeachers}
        <button className="addEditSubject_add-teacher" onClick={addTeacherAction}>
          Add new teacher
        </button>
      </div>

      <label>Week</label>
      <select className="addEditSubject_week" onChange={setWeekAction} value={week}>
        <option value="all">all weeks</option>
        <option value="even">even week</option>
        <option value="odd">odd week</option>
      </select>

      <label>Type</label>
      <select className="addEditSubject_type" onChange={setTypeAction} value={type}>
        <option value="exam">exam</option>
        <option value="test">test</option>
      </select>

      <label>Labs Count</label>
      <input
        className="addEditSubject_labs"
        onChange={setLabsAction}
        type="number"
        min="0"
        max="15"
        placeholder="Count of labs"
        value={labs}
      />

      <button className="addEditSubject_add-subject" onClick={updateSubjectAction}>
        {editFlag === 'add' ? 'Add' : 'Update'} and close
      </button>
      <button className="addEditSubject_close" onClick={() => changePage(true)}>
        Close
      </button>
    </div>
  )
}
