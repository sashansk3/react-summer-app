import axios from 'axios';
import {SERVER_ADDRESS} from "../config/app.conf"

export const SET_SUBJECTS = 'SET_SUBJECTS'
export function setSubjects(arr){
  return{
    type   : SET_SUBJECTS,
    payload: arr
  }
}

export const SET_SHOW_SUBJECT = 'SET_SHOW_SUBJECT'
export function setShowSubjects(subject){
  return{
    type   : SET_SHOW_SUBJECT,
    payload: subject
  }
}

export const setName = data => {
  return (dispatch, getState) => {
    let subject = getState().subjects.showSubject
    subject.name = data
    dispatch(setShowSubjects(subject))
  }
}

export const setWeek = data => {
  return (dispatch, getState) => {
    let subject = getState().subjects.showSubject
    subject.week = data
    dispatch(setShowSubjects(subject))
  }
}

export const setLabs = data => {
  return (dispatch, getState) => {
    let subject = getState().subjects.showSubject
    subject.labs = data
    dispatch(setShowSubjects(subject))
  }
}

export const setType = data => {
  return (dispatch, getState) => {
    let subject = getState().subjects.showSubject
    subject.type = data
    dispatch(setShowSubjects(subject))
  }
}


export const OPEN_POPUP = 'OPEN_POPUP'
export function openPopUp(subject){
  return dispatch => {
    dispatch(setShowSubjects(subject))
    dispatch({type: OPEN_POPUP})
  }
}

export const CLOSE_POPUP = 'CLOSE_POPUP'
export function closePopUp(){
  return {type: CLOSE_POPUP}
}

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
      id       = getState().subjects.showSubject.id,
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

export const addSubject = (teachers) => {
  return (dispatch, getState) => {
    const subjects = getState().subjects.subjects
    const subject = {
      week    : getState().subjects.showSubject.week,
      teachers: teachers || [],
      name    : getState().subjects.showSubject.name.trim(),
      labs    : getState().subjects.showSubject.labs,
      type    : getState().subjects.showSubject.type,
      userId  : getState().user.user.id
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

export const updateSubject = (teachers) => {
  return (dispatch, getState) => {
    const subjects = getState().subjects.subjects
    const subject = {
      id      : getState().subjects.showSubject.id,
      week    : getState().subjects.showSubject.week,
      teachers: teachers || [],
      name    : getState().subjects.showSubject.name.trim(),
      labs    : getState().subjects.showSubject.labs,
      type    : getState().subjects.showSubject.type,
      userId  : getState().user.user.id
    }
  
    axios
      .put(`${SERVER_ADDRESS}/subjects`, {subject})
      .then(res => {
        let newSubjects = subjects.filter(subject => subject.id !== subject.id)
        newSubjects.push(subject)
        dispatch(setSubjects(newSubjects))
        window.alert("Данные успешно добавлены")
      })
      .catch(err => {
        console.log(err)
        window.alert(err)
      })
  }
}
