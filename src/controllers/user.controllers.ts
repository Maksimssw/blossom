import {Request, Response} from "express";
import db from "../db";
import {addUser, getUserByMail} from "../queries";
import bcrypt from 'bcrypt'
import { Types } from 'mongoose'
import jsw from 'jsonwebtoken'
import {IUser} from "../types";
import {throws} from "assert";
export const createUser = async (request: Request, response: Response) => {
  try {
    const {name, email, password} = request.body

    const checkUserMail: IUser | void = await getUserHandler(email)

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

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUser = request.body

    const checkUser: IUser | void = await getUserHandler(email)

    if (typeof checkUser === 'object') {
      if (Object.entries(checkUser).length === 0) {
        return response.status(409).send('the user was not found')
      }

      const isPasswordIdentical = await bcrypt.compare(password, checkUser.password)

      if (isPasswordIdentical) {
        const token = getUserToken(checkUser.id)

        return response.send({
          token,
          user: {
            email: checkUser.email,
            name: checkUser.name,
          }
        })
      } else {
        response.status(400).send({message: 'Invalid username or password'})
      }
    }

  } catch (error) {
    throw (error)
  }
}

const getUserToken = (_id: number | Types.ObjectId) => {
   const authUserToken = jsw.sign({_id}, "express", {
     expiresIn: '7d'
   })

  return authUserToken
}

const getUserHandler = async (email: string) => {
  return await db
    .query(getUserByMail, [email])
    .then((result) => {
      const answer: IUser = result.rows[0]
      return answer
    })
    .catch((error) => throws (error))
}