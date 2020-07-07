import React from 'react'
import {useDispatch} from 'react-redux'

import { setLogin, setPassword, signUp } from "../actions/action.user"

export default function Reg() {
  const 
    dispatch = useDispatch(),
    setLoginAction = e => dispatch(setLogin(e.target.value)),
    setPasswordAction = e => dispatch(setPassword(e.target.value));

  return(
    <div className="authPopUp-content">
      Регистрация
      <input name="login" onChange={setLoginAction} placeholder="login"/>
      <input name="password" onChange={setPasswordAction} type="password" placeholder="password"/>
      <button className="submit" onClick={()=>dispatch(signUp())}>Enter</button>
    </div>
  )
}