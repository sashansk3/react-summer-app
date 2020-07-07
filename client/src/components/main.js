import React from "react"
// import { Switch, Route, Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
// import { useSelector } from 'react-redux';

import Header from "./header"
import Todos from "./todos"
import Subjects from "./subjects"
import AddSubject from "./addSubject"
import EditSubject from "./editSubject"
import Labs from "./labs"

import "../styles/all.scss"
export default function Router(){
  // const user = useSelector(store => store.user.user)
  return(
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/todos" component={Todos} />
        <Route exact path="/subjects" component={Subjects} />
        <Route exact path="/subjects/add" component={AddSubject} />
        <Route exact path="/subjects/edit" component={EditSubject} />
        <Route exact path="/labs" component={Labs} />
      </Switch>
    </div>
  )
}