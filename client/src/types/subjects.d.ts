interface SubjectInterface {
  id: number | null
  name: string
  week: string
  type: string
  teachers: []
  labs: LabInterface[]
  labsCount: number
}

export interface SubjectsInterface {
  subjects: []
  isOpen: boolean
  editFlag: boolean
  subject: SubjectInterface
}
