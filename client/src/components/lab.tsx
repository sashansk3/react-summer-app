import React from 'react'
import '../styles/lab.scss'
import { LabInterface } from '../types/labs'

interface LabPropsInterface {
  lab: LabInterface
  openPopUp(lab: LabInterface): void
}

export default function Lab(props: LabPropsInterface) {
  return (
    <div
      className={`lab lab__${props.lab.status}`}
      onClick={() => props.openPopUp(props.lab)}
    ></div>
  )
}
