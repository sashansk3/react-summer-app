import axios from 'axios'
import { batch } from 'react-redux'
import { SERVER_ADDRESS } from '../config/app.conf'
import { setMessage } from './message.action'
import { SubjectInterface } from '../types/subjects'

export const SET_SUBJECTS: string = 'SET_SUBJECTS'
export const setSubjects = (arr: any[]) => ({ type: SET_SUBJECTS, payload: arr })

export const SET_SUBJECT: string = 'SET_SUBJECT'
export const setSubject = (subject: SubjectInterface) => ({
  type: SET_SUBJECT,
  payload: subject,
})

export const SET_EDIT_FLAG: string = 'SET_EDIT_FLAG'
export const setEditFlag = (flag: string) => ({
  type: SET_EDIT_FLAG,
  payload: flag,
})

export const dropSubject = () => {
  return (dispatch: any) => {
    const subject: SubjectInterface = {
      id: null,
      name: '',
      week: 'all',
      type: 'exam',
      teachers: [],
      labsCount: 0,
      labs: [],
    }
    batch(() => {
      dispatch(setSubject(subject))
      dispatch(setEditFlag('add'))
    })
  }
}

export const setName = (name: string) => {
  return (dispatch: any, getState: any) => {
    let subject = { ...getState().subjects.subject }
    subject.name = name
    dispatch(setSubject(subject))
  }
}

export const setWeek = (week: string) => {
  return (dispatch: any, getState: any) => {
    let subject = getState().subjects.subject
    subject.week = week
    dispatch(setSubject(subject))
  }
}

export const setLabs = (labsCount: number) => {
  return (dispatch: any, getState: any) => {
    let subject = getState().subjects.subject
    subject.labs = labsCount
    dispatch(setSubject(subject))
  }
}

export const setType = (type: string) => {
  return (dispatch: any, getState: any) => {
    let subject = getState().subjects.subject
    subject.type = type
    dispatch(setSubject(subject))
  }
}

export const setTeacher = (index: number, value: string) => {
  return (dispatch: any, getState: any) => {
    let teachers = [...getState().subjects.subject.teachers]
    teachers[index] = value
    let newSubject = { ...getState().subjects.subject, teachers }
    dispatch(setSubject(newSubject))
  }
}

export const addTeacher = () => {
  return (dispatch: any, getState: any) => {
    let teachers = [...getState().subjects.subject.teachers, '']
    let newSubject = { ...getState().subjects.subject, teachers }
    dispatch(setSubject(newSubject))
  }
}

export const deleteTeacher = (index: number) => {
  return (dispatch: any, getState: any) => {
    let teachers = [...getState().subjects.subject.teachers]
    teachers.splice(index, 1)
    let newSubject = { ...getState().subjects.subject, teachers }
    dispatch(setSubject(newSubject))
  }
}

export const getSubjects = () => {
  return (dispatch: any, getState: any) => {
    let userId = getState().user.user.id
    axios
      .get(`${SERVER_ADDRESS}/subjects`, {
        params: { userId },
      })
      .then((result) => {
        dispatch(setSubjects(result.data))
      })
      .catch((err) => {
        dispatch(setMessage(err, 'error'))
      })
  }
}

export const deleteSubject = () => {
  return (dispatch: any, getState: any) => {
    const id = getState().subjects.subject.id,
      subjects = getState().subjects.subjects
    axios
      .delete(`${SERVER_ADDRESS}/subjects/:${id}`)
      .then((result) => {
        let newList = subjects.filter((subject: any) => subject.id !== id)

        const message = 'Successfully deleted'

        batch(() => {
          dispatch(setMessage(message, 'success'))
          dispatch(setSubjects(newList))
        })
      })
      .catch((err) => {
        dispatch(setMessage(err, 'error'))
      })
  }
}

export const addSubject = () => {
  return (dispatch: any, getState: any) => {
    const subjects = getState().subjects.subjects
    const subject = {
      userId: getState().user.user.id,
      ...getState().subjects.subject,
    }

    const errMessage = validateSubject(subject, subjects)
    if (errMessage) {
      dispatch(setMessage(errMessage, 'error'))
      return
    }

    axios
      .post(`${SERVER_ADDRESS}/subjects`, { subject })
      .then((res) => {
        subject.id = res.data.id
        subjects.push(subject)
        const message = 'Successfully added'
        batch(() => {
          dispatch(setMessage(message, 'success'))
          setSubjects(subjects)
        })
      })
      .catch((err) => {
        dispatch(setMessage(err, 'error'))
      })
  }
}

export const updateSubject = () => {
  return (dispatch: any, getState: any) => {
    const subjects = getState().subjects.subjects
    const subject = {
      userId: getState().user.user.id,
      ...getState().subjects.subject,
    }
    const errMessage = validateSubject(subject, subjects)
    if (errMessage) {
      dispatch(setMessage(errMessage, 'error'))
      return 0
    }

    axios
      .put(`${SERVER_ADDRESS}/subjects`, { subject })
      .then((res) => {
        let newSubjects = subjects.filter((elem: any) => elem.id !== subject.id)
        newSubjects.push(subject)

        const message = 'Successfully updated'
        batch(() => {
          dispatch(setMessage(message, 'success'))
          dispatch(setSubjects(newSubjects))
        })
      })
      .catch((err) => {
        dispatch(setMessage(err, 'error'))
      })
  }
}

const validateSubject = (subject: any, subjects: []) => {
  let errMessage = ''

  if (subject.name === '') {
    errMessage = 'Subject name is empty'
  } else if (subjects.find((elem: any) => elem.name === subject.name && elem.id !== subject.id)) {
    errMessage = 'Subject with same name already exist'
  } else if (subject.labs < 0 || subject.labs > 15) {
    errMessage = 'Incorrect labs count'
  }
  return errMessage
}
