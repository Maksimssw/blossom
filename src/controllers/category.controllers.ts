import db from "../db";
import {Request, Response} from "express";
import {ICategory} from "../types";
import {AuthRequest} from "../middleware";
import {addCategory, allCategories} from "../queries";

export const getAllCategories = async (request: AuthRequest, response: Response) => {
  try {
    const {user} = request

    const categories: ICategory[] = await categoriesHandler(allCategories, [user])
    response.send(categories)
  }catch (error) {
    response.send({'error': 'Something went wrong.'})
    throw (error)
  }
}

export const createCategory = async (request: AuthRequest, response: Response) => {
  try {
    const {name, color, icon, isEditable}: ICategory = request.body
    const {user} = request

    const category: ICategory[] = await categoriesHandler(addCategory, [
      name, user, color, icon,
    ])

    response.send(category)
  } catch (error) {
    response.send({'error': 'Something went wrong. createCategory'})
    throw (error)
  }
}

const categoriesHandler = async (text: string, params: unknown[]) => {
  return await db
    .query(addCategory, params)
    .then(items => {
      const category: ICategory[] = items.rows
      console.log(category)
      return category
    })
}