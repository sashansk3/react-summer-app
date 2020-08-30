interface TodoInterface {
  id: number | null
  title: string
  content: string
  deadline: string
  status: boolean
}

export interface TodosInterface {
  todos: TodoInterface[]
  tempTodos: TodoInterface[]
  editFlag: boolean
  todo: TodoInterface
}
