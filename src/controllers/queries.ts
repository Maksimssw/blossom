export const getUserByMail: string = "SELECT * FROM public.user_info WHERE email = $1"
export const addUser: string = "INSERT INTO public.user_info (name, email, password) VALUES ($1, $2, $3)"

export interface IResult {
  rows: object[]
}