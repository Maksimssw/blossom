// User
export const getUserByMail: string = "SELECT * FROM public.user_info WHERE email = $1"
export const addUser: string = "INSERT INTO public.user_info (name, email, password) VALUES ($1, $2, $3)"
export const getUserById: string = "SELECT * FROM public.user_info WHERE id = $1"

// Category
export const addCategory: string = "INSERT INTO public.category (name, user, color, icon) VALUES ($1, $2, $3, $4)"
export const allCategories: string = "SELECT * FROM public.category WHERE user_id = $1"