import axios from 'axios'
import { batch } from 'react-redux'
import { SERVER_ADDRESS } from '../config/app.conf'

import { setSubjects } from './action.subject'
import { setMessage } from './message.action'
import { LabInterface } from '../types/labs'

export const OPEN_LAB_POPUP = 'OPEN_LAB_POPUP'
export const openLabPopUp = (lab: LabInterface) => {
  return (dispatch: any) => {
    batch(() => {
      dispatch(setLab(lab))
      dispatch({ type: OPEN_LAB_POPUP })
    })
  }
}

export const CLOSE_LAB_POPUP = 'CLOSE_LAB_POPUP'
export const closeLabPopUp = () => {
  return (dispatch: any) => {
    const emptyLab = {
      id: null,
      date: '-',
      points: 0,
      max_points: 0,
      status: 'false',
    }
    batch(() => {
      dispatch(setLab(emptyLab))
      dispatch(setEditFlag('add'))
      dispatch({ type: CLOSE_LAB_POPUP })
    })
  }
}

export const SET_LAB = 'SET_LAB'
export const setLab = (lab: LabInterface) => ({ type: SET_LAB, payload: lab })

export const SET_LAB_EDIT_FLAG = 'SET_LAB_EDIT_FLAG'
export const setEditFlag = (flag: string) => ({ type: SET_LAB_EDIT_FLAG, payload: flag })

export const SET_DATE = 'SET_DATE'
export const setDate = (date: string) => {
  return (dispatch: any, getState: any) => {
    let lab = { ...getState().labs.lab }
    lab.date = date
    dispatch(setLab(lab))
  }
}

export const SET_POINTS = 'SET_POINTS'
export const setPoints = (points: number) => {
  return (dispatch: any, getState: any) => {
    let lab = { ...getState().labs.lab }
    lab.points = points
    dispatch(setLab(lab))
  }
}

export const SET_MAX_POINTS = 'SET_MAX_POINTS'
export const setMaxPoints = (max_points: number) => {
  return (dispatch: any, getState: any) => {
    let lab = { ...getState().labs.lab }
    lab.max_points = max_points
    dispatch(setLab(lab))
  }
}

export const SET_STATUS = 'SET_STATUS'
export const setStatus = (status: string) => {
  return (dispatch: any, getState: any) => {
    let lab = { ...getState().labs.lab }
    lab.status = status
    dispatch(setLab(lab))
  }
}

export const updateLab = () => {
  return (dispatch: any, getState: any) => {
    let subjects = [...getState().subjects.subjects],
      editedLab = { ...getState().labs.lab }

    axios
      .put(`${SERVER_ADDRESS}/labs/:${editedLab.id}`, { lab: editedLab })
      .then((lab) => {
        const newSubject = subjects.map((subject) => {
          return subject.Laboratories.map((lab: any) => {
            return lab.id === +editedLab.id ? { ...lab, ...editedLab } : lab
          })
        })

        const text = 'Successfully updated'
        batch(() => {
          dispatch(setSubjects(newSubject))
          dispatch(closeLabPopUp())
          dispatch(setMessage(text, 'success'))
        })
      })
      .catch((err) => {
        const text = err
        dispatch(setMessage(text, 'error'))
      })
  }
}
