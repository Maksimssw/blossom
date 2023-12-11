import e, {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken'
import db from "../db";
import {getUserById} from "../queries";
import {IUser} from "../types";

export interface AuthRequest extends Request {
  user: number
}

export const authMiddleware = async (request: AuthRequest, response: Response, next: NextFunction) => {
  try {
    const {authorization} = request.headers

    if (!authorization) {
      return  response.status(401).json({'message': 'not authorized'})
    }

    const {_id} = jwt.verify(authorization, 'express')
    const existUser = await userHandler(_id)

    if (existUser) {
      request.user = existUser.id
    }

    next()
  } catch (error) {
    response.send({'error': 'Something went wrong. authMiddleware'})
    throw (error)
  }
}

const userHandler = async (_id: string) => {
  return await db
    .query(getUserById, [_id])
    .then(items => {
      const user: IUser = items.rows[0]
      return user
    })
}