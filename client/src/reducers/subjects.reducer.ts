import { SET_SUBJECTS, SET_SUBJECT, SET_EDIT_FLAG } from '../actions/action.subject'
import { SubjectsInterface } from '../types/subjects'

const initialState: SubjectsInterface = {
  subjects: [],
  isOpen: false,
  editFlag: false,
  subject: {
    id: null,
    name: '',
    week: 'all',
    type: 'exam',
    teachers: [],
    labsCount: 0,
    labs: [],
  },
}

export const subjectsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SUBJECTS:
      return { ...state, subjects: action.payload }
    case SET_SUBJECT:
      return { ...state, subject: action.payload }
    case SET_EDIT_FLAG:
      return { ...state, editFlag: action.payload }

    default:
      return state
  }
}
