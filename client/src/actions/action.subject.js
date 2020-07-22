import axios from 'axios';
import { batch } from "react-redux";
import {SERVER_ADDRESS} from "../config/app.conf"

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
    dispatch(setSubject(subject))
    dispatch({type: OPEN_POPUP})
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
        window.alert(err)
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
        dispatch(setSubjects(newListOfSubjects))
        dispatch(closePopUp())
      })
      .catch(err => {
        window.alert(err)
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

    if(subjects.find(elem => elem.name === subject.name)){
      window.alert("Предмет с таким именем уже существует")
      return
    }
    else if(subject.name === ""){
      window.alert("Empty name")
      return
    }
    axios
      .post(`${SERVER_ADDRESS}/subjects`, {subject})
      .then(res => {
        subject.id = res.data.id
        subjects.push(subject)
        setSubjects(subjects)
        window.alert("Данные успешно добавлены")
      })
      .catch(err => {
        window.alert(err)
      })
  }
}

export const updateSubject = () => {
  return (dispatch, getState) => {
    const subjects = getState().subjects.subjects
    const editedSubject = {
      userId  : getState().user.user.id,
      ...getState().subjects.subject
    }
    // let result = validateSubject(editedSubject)
    axios
      .put(`${SERVER_ADDRESS}/subjects`, {subject:editedSubject})
      .then(res => {
        let newSubjects = subjects.filter(subject => subject.id !== editedSubject.id)
        newSubjects.push(editedSubject)
        dispatch(setSubjects(newSubjects))
        window.alert("Данные успешно добавлены")
      })
      .catch(err => {
        window.alert(err)
      })
  }
}


const validateSubject = subject => {

}