import express from 'express'
import userRoutes from "./routes/user.routes";
import categoryRouter from "./routes/category.routes";

const app = express()
const PORT = 1338

app.use(express.json())

app.use('/user', userRoutes)
app.use('/category', categoryRouter)

app.listen(PORT, () => {
  console.log('Server started...')
})