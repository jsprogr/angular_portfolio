export interface  IUser {
  email: string
  password: string
}

export interface Message {
  message: string
}

export interface Category {
  _id?: string
  name: string
  imageSrc?: string
  user?: string
}

export interface Position {
  _id?: string
  name: string
  cost: number
  user?: string
  category: string
}
