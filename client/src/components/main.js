import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setMessage } from "../actions/message.action"
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'

import Header from "./header"
import Todos from "./todos"
import Subjects from "./subjects"
import EditAddSubject from "./editAddSubject"
import Labs from "./labs"

import "../styles/all.scss"
import Messages from "./messages"

const routes = [
  {path: "/todos", component: Todos},
  {path: "/subjects", component: Subjects},
  {path: ["/subjects/edit", "/subjects/add"], component: EditAddSubject},
  {path: "/labs", component: Labs},
]
export default function Router(){
  const 
    dispatch = useDispatch(),
    userId   = useSelector(store => store.user.user.id),
    location = useLocation();

  if(location.state?.from.pathname && !userId){
    const message = {
      text: `
        You has been redirected from url ${location.state?.from.pathname}.
        Auth to get accsess to this url.
        `,
      type: "info"
    }
    dispatch(setMessage(message))
  }
  return(
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={() => <div>Hello</div>} />
        {
          userId
          ?(
            routes.map(({path, component}) => <Route exact path={path} component={component} />)
          ):(
            <Redirect to={{
              pathname: "/",
              state: { from: location }
            }}/>
          )
        }
      </Switch>
      <Messages />
    </div>
  )
}