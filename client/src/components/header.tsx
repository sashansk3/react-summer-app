import React from 'react'
import { Link } from 'react-router-dom'
import AuthReg from './authReg'

import "../styles/header.scss"

const entryPoints = [
  {title: "Home",       href:"/home"},
  {title: "Todos",      href:"/todos"},
  {title: "Subjects",   href:"/subjects"},
  {title: "Labs",       href:"/labs"},
  {title: "Statistics", href:"/stat"},
]

export default function Header() {
  return (
    <div className="header">
      <div className="header-links">
        {
          entryPoints.map(({title, href}, id) => 
            <Link to={href} key={id}>
              <span className="header-link">{title}</span>
            </Link>
          )
        }
      </div>
      <AuthReg/>
    </div>
  )
}