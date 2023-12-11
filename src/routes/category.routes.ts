import {createCategory, getAllCategories} from "../controllers/category.controllers";
import {authMiddleware} from "../middleware";
import Router from "express";

const categoryRouter = Router()

categoryRouter.use(authMiddleware)

categoryRouter.route('/').get(getAllCategories)
categoryRouter.route('/create').post(createCategory)

export default categoryRouter