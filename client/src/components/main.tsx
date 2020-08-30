import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from '../actions/message.action'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { Location } from 'history'

import Header from './header'
import Todos from './todos'
import Subjects from './subjects'
import EditAddSubject from './editAddSubject'
import Labs from './labs'
import { RootState } from '../reducers'
import '../styles/all.scss'
import Messages from './messages'

const routes = [
  { path: '/todos', component: Todos },
  { path: '/subjects', component: Subjects },
  { path: ['/subjects/edit', '/subjects/add'], component: EditAddSubject },
  { path: '/labs', component: Labs },
]

export default function Router() {
  const dispatch = useDispatch()
  const userId = useSelector((store: RootState) => store.user.user.id)
  const location = useLocation<Location>()

  if (location.state && location.state.pathname && !userId) {
    const message = `You has been redirected from url ${location.state.pathname}.
        Auth to get accsess to this url.`
    dispatch(setMessage(message, 'info'))
  }
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={() => <div>Hello</div>} />
        {userId ? (
          routes.map(({ path, component }, index) => {
            return <Route key={index} exact path={path} component={component} />
          })
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: location,
            }}
          />
        )}
      </Switch>
      <Messages />
    </div>
  )
}
