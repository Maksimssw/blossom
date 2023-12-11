export interface IUser {
  name: string,
  email: string,
  password: string,
  id: number
}

export interface IColor {
  id: number,
  name: string,
  code: string
}

export interface IIcon {
  id: number,
  name: string,
  symbol: string
}

export interface ICategory {
  id?: number,
  name: string,
  color: IColor,
  icon: IIcon,
  user: number | IUser,
  isEditable: number
}