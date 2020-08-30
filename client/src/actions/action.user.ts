import axios from 'axios'
import { LOCALSTORAGE_NAME, SERVER_ADDRESS } from '../config/app.conf'
import { UserInterface } from '../types/user'

export const SET_USER = 'SET_USER'
export function setUser(user: UserInterface) {
  localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(user))
  return {
    type: SET_USER,
    payload: user,
  }
}

export const UNSET_USER = 'UNSET_USER'
export function unsetUser() {
  localStorage.clear()
  return { type: UNSET_USER }
}

export const OPEN_POPUP = 'OPEN_POPUP'
export const openPopUp = () => ({ type: OPEN_POPUP })

export const CLOSE_POPUP = 'CLOSE_POPUP'
export const closePopUp = () => ({ type: CLOSE_POPUP })

export const setLogin = (login: string) => {
  return (dispatch: any, getState: any) => {
    let user = getState().user.user
    user.login = login
    dispatch(setUser(user))
  }
}

export const setPassword = (password: string) => {
  return (dispatch: any, getState: any) => {
    let user = getState().user.user
    user.password = password
    dispatch(setUser(user))
  }
}

export const signIn = () => {
  return (dispatch: any, getState: any) => {
    let user = {
      login: getState().user.user.login,
      password: getState().user.user.password,
    }

    axios
      .post(`${SERVER_ADDRESS}/users/auth`, { user })
      .then((user) => {
        if (user.data === 'Invalid login' || user.data === 'Invalid password') {
          window.alert(user.data)
          return
        }
        dispatch(setUser(user.data))
        dispatch(closePopUp())
      })
      .catch((err) => {
        window.alert(err)
      })
  }
}

export const signUp = () => {
  return (dispatch: any, getState: any) => {
    let user = {
      login: getState().user.user.login,
      password: getState().user.user.password,
    }

    axios
      .post(`${SERVER_ADDRESS}/users/reg`, { user })
      .then((res) => {
        if (res.data === 'User with login already exist') {
          alert(res.data)
          return
        }
        dispatch(setUser(res.data))
        dispatch(closePopUp())
      })
      .catch((err) => {
        window.alert(err.message)
      })
  }
}
