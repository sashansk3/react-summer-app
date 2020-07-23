import axios from 'axios';
import { batch } from "react-redux";
import {SERVER_ADDRESS} from "../config/app.conf"
import { setMessage } from "./message.action"

export const SET_SUBJECTS = 'SET_SUBJECTS'
export const setSubjects = arr => ({type: SET_SUBJECTS, payload: arr})

export const SET_SUBJECT = 'SET_SUBJECT'
export const setSubject = subject => ({type: SET_SUBJECT, payload: subject})

export const SET_EDIT_FLAG = 'SET_EDIT_FLAG'
export const setEditFlag = flag => ({type: SET_EDIT_FLAG, payload: flag})

export const dropSubject = () => {
  return dispatch => {
    const subject = {
      id       : null,
      name     : "",
      week     : "all",
      type     : "exam",
      teachers : [],
      labsCount: 0,
    }
    batch(() => {
      dispatch(setSubject(subject))
      dispatch(setEditFlag(false))
    })
  }
}

export const setName = name => {
  return (dispatch, getState) => {
    let subject = getState().subjects.subject
    subject.name = name
    dispatch(setSubject(subject))
  }
}

export const setWeek = week => {
  return (dispatch, getState) => {
    let subject = getState().subjects.subject
    subject.week = week
    dispatch(setSubject(subject))
  }
}

export const setLabs = labsCount => {
  return (dispatch, getState) => {
    let subject = getState().subjects.subject
    subject.labs = labsCount
    dispatch(setSubject(subject))
  }
}

export const setType = type => {
  return (dispatch, getState) => {
    let subject = getState().subjects.subject
    subject.type = type
    dispatch(setSubject(subject))
  }
}

export const setTeacher = (i, value) => {
  return (dispatch, getState) => {
    let teachers = [...getState().subjects.subject.teachers]
    teachers[i] = value
    let newSubject = {... getState().subjects.subject, teachers}
    dispatch(setSubject(newSubject))
  }
}

export const addTeacher = () => {
  return (dispatch, getState) => {
    let teachers = [...getState().subjects.subject.teachers, ""]
    let newSubject = {... getState().subjects.subject, teachers}
    dispatch(setSubject(newSubject))
  }
}

export const deleteTeacher = (index) => {
  return (dispatch, getState) => {
    let teachers = [...getState().subjects.subject.teachers]
    teachers.splice(index, 1)
    let newSubject = {... getState().subjects.subject, teachers}
    dispatch(setSubject(newSubject))
  }
}

export const OPEN_POPUP = 'OPEN_POPUP'
export const openPopUp = subject => {
  return dispatch => {
    batch(() => {
      dispatch(setSubject(subject))
      dispatch({type: OPEN_POPUP})
    })
  }
}

export const CLOSE_POPUP = 'CLOSE_POPUP'
export const closePopUp = () => ({type: CLOSE_POPUP})

export const getSubjects = () => {
  return (dispatch, getState) => {
    let userId = getState().user.user.id
    axios
      .get(`${SERVER_ADDRESS}/subjects`, {
        params: {userId}
      })
      .then(result => {
        dispatch(setSubjects(result.data))
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

export const deleteSubject = () => {
  return (dispatch, getState) => {
    const
      id       = getState().subjects.subject.id,
      subjects = getState().subjects.subjects;
    axios
      .delete(`${SERVER_ADDRESS}/subjects/:${id}`)
      .then(result => {
        let newListOfSubjects = subjects.filter(subject => subject.id !== id)
        batch(() => {
          const message = {
            text: "Successfully deleted",
            type: "success"
          }
          batch(() => {
            dispatch(setMessage(message))
            dispatch(setSubjects(newListOfSubjects))
            dispatch(closePopUp())
          })
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

export const addSubject = () => {
  return (dispatch, getState) => {
    const subjects = getState().subjects.subjects
    const subject = {
      userId  : getState().user.user.id,
      ...getState().subjects.subject
    }
    
    const result = validateSubject(subject, subjects)
    if(result.text) {
      dispatch(setMessage(result))
      return 0
    }

    axios
      .post(`${SERVER_ADDRESS}/subjects`, {subject})
      .then(res => {
        subject.id = res.data.id
        subjects.push(subject)
        const message = {
          text: "Successfully added",
          type: "success"
        }
        batch(() => {
          dispatch(setMessage(message))
          setSubjects(subjects)
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

export const updateSubject = () => {
  return (dispatch, getState) => {
    const subjects = getState().subjects.subjects
    const subject = {
      userId  : getState().user.user.id,
      ...getState().subjects.subject
    }
    const result = validateSubject(subject, subjects)
    if(result.text) {
      dispatch(setMessage(result))
      return 0
    }

    axios
      .put(`${SERVER_ADDRESS}/subjects`, { subject })
      .then(res => {
        let newSubjects = subjects.filter(elem => elem.id !== subject.id)
        newSubjects.push(subject)

        const message = {
          text: "Successfully updated",
          type: "success"
        }
        batch(() => {
          dispatch(setMessage(message))
          dispatch(setSubjects(newSubjects))
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

const validateSubject = (subject, subjects) => {
  const message = {
    text: "",
    type: "error"
  }

  if(subject.name === "") {
    message.text = "Subject name is empty"
  }
  else if(subjects.find(elem => elem.name === subject.name)){
    message.text = "Subject with same name already exist"
  }
  else if(subject.labs < 0 || subject.labs > 15){
    message.text = "Incorrect labs count"
  }
  return message
}