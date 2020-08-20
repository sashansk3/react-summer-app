import axios from 'axios';
import { batch } from 'react-redux';
import { SERVER_ADDRESS } from "../config/app.conf"

import { setSubjects } from "./action.subject"
import { setMessage } from "./message.action"

export const OPEN_LAB_POPUP = 'OPEN_LAB_POPUP'
export const openLabPopUp = lab => {
  return dispatch => {
    batch(() => {
      dispatch(setLab(lab))
      dispatch({ type: OPEN_LAB_POPUP })
     })
  }
}

export const CLOSE_LAB_POPUP = 'CLOSE_LAB_POPUP'
export const closeLabPopUp = () => {
  return dispatch => {
    const emptyLab = {
      id        : null,
      date      : "-",
      points    : 0,
      max_points: 0,
      status    : "false",
    }
    batch(() => {
      dispatch(setLab(emptyLab))
      dispatch(setEditFlag(false))
      dispatch({ type: CLOSE_LAB_POPUP })
    })
  }
}

export const SET_LAB = 'SET_LAB'
export const setLab = lab => ({ type: SET_LAB, payload: lab })

export const SET_LAB_EDIT_FLAG = 'SET_LAB_EDIT_FLAG'
export const setEditFlag = flag => ({ type: SET_LAB_EDIT_FLAG, payload: flag })

export const SET_DATE = "SET_DATE"
export const setDate = data => {
  return (dispatch, getState) => {
    let lab = {...getState().labs.lab}
    lab.date = data
    dispatch(setLab(lab))
  }
}

export const SET_POINTS = "SET_POINTS"
export const setPoints = (data) => {
  return (dispatch, getState) => {
    let lab = {...getState().labs.lab}
    lab.points = data
    dispatch(setLab(lab))
  }
}

export const SET_MAX_POINTS = "SET_MAX_POINTS"
export const setMaxPoints = (data) => {
  return (dispatch, getState) => {
    let lab = {...getState().labs.lab}
    lab.max_points = data
    dispatch(setLab(lab))
  }
}

export const SET_STATUS = "SET_STATUS"
export const setStatus = (data) => {
  return (dispatch, getState) => {
    let lab = {...getState().labs.lab}
    lab.status = data
    dispatch(setLab(lab))
  }
}

export const updateLab = () => {
  return (dispatch, getState) => {
    let 
      subjects  = [...getState().subjects.subjects],
      editedLab = {...getState().labs.lab};

    axios
      .put(`${SERVER_ADDRESS}/labs/:${editedLab.id}`, { lab: editedLab })
      .then(lab => {
        const newSubject = subjects.map(subject => {
          return subject.Laboratories.map(lab => {
            return lab.id === +editedLab.id? { ...lab, ...editedLab }: lab
          })
        })

        const message = {
          text: "Successfully updated",
          type: "success"
        }
        batch(() => {
          dispatch(setSubjects(newSubject))
          dispatch(closeLabPopUp())
          dispatch(setMessage(message))
        })
      })
      .catch(err => {
        const message = {
          text: err,
          type: "error"
        }
        dispatch(setMessage(message))
      })
  }
}