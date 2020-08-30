interface LabInterface {
  id: number | null
  date: string
  points: number
  max_points: number
  status: string
}

export interface LabsInterface {
  isOpen: boolean
  editFlag: boolean
  lab: LabInterface
}
