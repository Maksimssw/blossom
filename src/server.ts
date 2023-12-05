import express from 'express'
import userRoutes from "./routes/user.routes";

const app = express()
const PORT = 1337

app.use(express.json())

app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log('Server started...')
})