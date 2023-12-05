import {Request, Response} from "express";
import db from "../db";
import {addUser, getUserByMail, IResult} from "./queries";
import bcrypt from 'bcrypt'
import {IUser} from "../types";

export const createUser = async (request: Request, response: Response) => {
  try {
    const {name, email, password} = request.body

    const checkUserMail: IUser | void = await getUserHandler(getUserByMail, [email])

    if (
      typeof checkUserMail === 'object' &&
      Object.entries(checkUserMail).length !== 0
    ) {
      return response.status(409).send('user already exist')
    }

    const hashPassword = await bcrypt.hash(password, 12)

    db
      .query(addUser, [name, email, hashPassword])
      .then(() => response.status(201).send('Accept'))
      .catch((error) => response.status(401).send(error))

  } catch (error) {
    console.log(`Error is create: `, error)
    throw error
  }

}

const loginUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password }: IUser = request.body

    const checkUser: IUser | void = await getUserHandler(getUserByMail, [email])

    if (typeof checkUser === 'object') {
      if (Object.entries(checkUser).length === 0) {
        return response.status(409).send('the user was not found')
      }

      const isPasswordIdentical = await bcrypt.compare(password, checkUser.password)
    }

  } catch (error) {
    throw (error)
  }
}

const getUserHandler = async (query: string, array: unknown[]) => {
  return db
    .query(query, array)
    .then((result) => {
      const answer: IUser = result.rows[0]
      return answer
    })
    .catch(((error) => console.log(error)))
}