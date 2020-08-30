import React from 'react'
import { useDispatch } from 'react-redux'

import { setLogin, setPassword, signIn } from '../actions/action.user'

export default function Auth() {
  const dispatch = useDispatch(),
    setLoginAction = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setLogin(e.target.value)),
    setPasswordAction = (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(setPassword(e.target.value))

  return (
    <div className="authPopUp-content">
      Авторизация
      <input name="login" onChange={setLoginAction} placeholder="login" />
      <input name="password" onChange={setPasswordAction} type="password" placeholder="password" />
      <button className="submit" onClick={() => dispatch(signIn())}>
        Enter
      </button>
    </div>
  )
}
