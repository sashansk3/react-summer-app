import React, { useRef, useState } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import Auth from './auth'
import Reg from './reg'
import { unsetUser, openPopUp, closePopUp } from '../actions/action.user'
import { RootState } from '../reducers'
import PopUp from './popup'
import '../styles/authReg.scss'

export default function AuthReg() {
  const dispatch = useDispatch(),
    user = useSelector((store: RootState) => store.user.user, shallowEqual),
    isOpen = useSelector((store: RootState) => store.user.isOpen, shallowEqual),
    signInBtn = useRef<HTMLButtonElement>(null),
    signUpBtn = useRef<HTMLButtonElement>(null)

  const [isLogin, changePage] = useState(true)

  const changeContent = (e: any) => {
    let that = e.target
    if (that.classList.contains('choise')) return

    that.classList.toggle('choise')
    isLogin
      ? signInBtn.current!.classList.toggle('choise')
      : signUpBtn.current!.classList.toggle('choise')
    changePage(!isLogin)
  }

  let isUserSet = user.id
  return (
    <div className="authReg">
      {isUserSet ? (
        <React.Fragment>
          <h5>Личный кабинет</h5>
          <button className="authReg-exit" onClick={() => dispatch(unsetUser())}>
            Exit
          </button>
        </React.Fragment>
      ) : (
        <button id="signIn" onClick={() => dispatch(openPopUp())}>
          Enter
        </button>
      )}
      <PopUp isOpen={isOpen} close={() => dispatch(closePopUp())}>
        <div className="authPopUp">
          <div className="authPopUp-header">
            <button ref={signInBtn} onClick={changeContent} className="signIn choise">
              signIn
            </button>
            <button ref={signUpBtn} onClick={changeContent} className="signUp">
              signUp
            </button>
          </div>
          {isLogin ? <Auth /> : <Reg />}
        </div>
      </PopUp>
    </div>
  )
}
