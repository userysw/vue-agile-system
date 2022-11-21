export interface Nav {
  id: string,
  parentId: string,
  name: string,
  icon: string,
  path: string,
  children: Nav[]
}

export interface Tab {
  name: string,
  val: string,
  path: string
}