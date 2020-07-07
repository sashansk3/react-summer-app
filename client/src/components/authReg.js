import React, { useRef, useState } from 'react'

import {useSelector, useDispatch, shallowEqual} from 'react-redux'

import Auth from "./auth"
import Reg from "./reg"
import { unsetUser, openPopUp, closePopUp } from "../actions/action.user"
import PopUp from "./popup"
import "../styles/authReg.scss"

export default function AuthReg() {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user.user, shallowEqual)
  const isOpen = useSelector(store => store.user.isOpen, shallowEqual)
  const [isLogin, changePage] = useState(true) 
  const signInBtn = useRef(null)
  const signUpBtn = useRef(null)

  const changeContent = (e) => {
    let that = e.target
    if(that.classList.contains("choise"))
      return

    that.classList.toggle("choise")

    isLogin
      ?signInBtn.current.classList.toggle("choise")
      :signUpBtn.current.classList.toggle("choise")

    changePage(!isLogin)
    // Очистка полей?
  }

  let isUserSet = user.id
  return (
    <div className="authReg">
      {
        isUserSet
        ?(
          <div>
            Здравствуйте, {user.login}
            <br/>
            <button className="authReg-exit" onClick={() => dispatch(unsetUser())}>Exit</button>
          </div>
        )
        :<button id="signIn" onClick={() => dispatch(openPopUp())}>Enter</button>
      }
      <PopUp
        isOpen={isOpen}
        close ={() => dispatch(closePopUp())}
      >
        <div className="authPopUp">
          <div className="authPopUp-header">
            <button ref={signInBtn} onClick={changeContent} className="signIn choise">signIn</button>
            <button ref={signUpBtn} onClick={changeContent} className="signUp">signUp</button>
          </div>
            {isLogin?<Auth />: <Reg/>}    
          <div className="authPopUp-footer">
            Что-то есть
          </div>
        </div>
      </PopUp>
    </div>
  )
}