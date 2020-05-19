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
  quantity?: number
}

export interface Order {
  date?: Date
  order?: number
  user?: string
  list: OrderPosition[]
  _id?: string
}

export interface OrderPosition {
  name: string
  quantity: number
  cost: number
  _id?: string
}
