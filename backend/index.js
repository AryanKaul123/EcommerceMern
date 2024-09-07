const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()

   
app.use(cors({
  origin: ['http://localhost:3000', 'https://ecommercemern-2.onrender.com'],
  credentials: true,
}));

   

app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

const PORT = process.env.PORT


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})
