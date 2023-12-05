import Router from 'express'
import {createUser} from "../controllers/user.controlles";

const userRouter = Router()

userRouter.route('/create').post(createUser)
export default userRouter
