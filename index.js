import dotenv from 'dotenv'
import express from 'express'
import jwt from "jsonwebtoken"
import cors from 'cors'
import productsRoutes from './app/routes/products.routes.js'
import categoriesRoutes from './app/routes/categories.routes.js'
import subcategoriesRoutes from './app/routes/subcategories.routes.js'
import users from './app/routes/users.routes.js'
import authentication from './app/routes/authentication.routes.js'
//import path from 'node:path'
//import * as url from 'url'

//const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dotenv.config()

const PORT = process.env.PORT



app.use('/api', productsRoutes)
app.use('/api', categoriesRoutes)
app.use('/api', subcategoriesRoutes)
app.use('/api', authentication)
app.use('/', users)

app.use((req, res) => {
    res.status(404).json({
        error: 0,
        message: "Resource no found"
    })
})


app.listen(PORT, () => {
    console.log(`Server is on PORT: ${PORT} `)
})