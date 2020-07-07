import axios from 'axios';
import {SERVER_ADDRESS} from "../config/app.conf"

import {setSubjects} from "./action.subject"


export const OPEN_POPUP = 'OPEN_POPUP'
export const openPopUp = (lab) => {
  return dispatch => {
    dispatch(setLab(lab))
    dispatch({type: OPEN_POPUP})
  }
}

export const CLOSE_POPUP = 'CLOSE_POPUP'
export const closePopUp = () => ({type: CLOSE_POPUP})

export const SET_LAB = 'SHOW_LAB'
export const setLab = (lab) => {
  return {
    type   : SET_LAB,
    payload: lab
  }
}

export const SET_DATE = "SET_DATE"
export const setDate = (data) => {
  return (dispatch, getState) => {
    let lab = getState().labs.showLab
    lab.date = data
    dispatch(setLab(lab))
  }
}

export const SET_POINTS = "SET_POINTS"
export const setPoints = (data) => {
  return (dispatch, getState) => {
    let lab = getState().labs.showLab
    lab.points = data
    dispatch(setLab(lab))
  }
}

export const SET_MAX_POINTS = "SET_MAX_POINTS"
export const setMaxPoints = (data) => {
  return (dispatch, getState) => {
    let lab = getState().labs.showLab
    lab.max_points = data
    dispatch(setLab(lab))
  }
}

export const SET_STATUS = "SET_STATUS"
export const setStatus = (data) => {
  return (dispatch, getState) => {
    let lab = getState().labs.showLab
    lab.status = data
    dispatch(setLab(lab))
  }
}

export const updateLab = () => {
  return (dispatch, getState) => {
    let subjects = getState().subjects.subjects
    let editedLab = {
      id        : getState().labs.showLab.id,
      date      : getState().labs.showLab.date,
      points    : getState().labs.showLab.points,
      max_points: getState().labs.showLab.max_points,
      status    : getState().labs.showLab.status,
    }

    axios
      .put(`${SERVER_ADDRESS}/labs/:${editedLab.id}`, {lab: editedLab})
      .then(lab => {
        const newSubject = []
        subjects.map(subject => {
          let elem = subject.Laboratories.map(lab => {
            if(lab.id === +editedLab.id)
              return {...lab, ...editedLab}
            else
              return lab
          })
          newSubject.push(elem)
        })

        dispatch(setSubjects(subjects))
        dispatch(closePopUp())
        window.alert("Данные успешно обновлены")
      })
      .catch(err => {
        window.alert(err)
      })
  }
}