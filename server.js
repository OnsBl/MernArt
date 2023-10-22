const express = require('express')
const app = express()
const multer  = require('multer')
const userRoutes=require('./routes/userRoutes')
const workRoutes=require('./routes/workRoutes')
const orderRoutes=require('./routes/orderRoutes')
const connect = require('./helpers/dbConnect')

const path=require('path')
require('dotenv').config()
connect()

const cors=require('cors');
const upload = require('./upload');
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(express.json())

app.use('/api',userRoutes)
app.use('/api',workRoutes)
app.use('/api',orderRoutes)

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
 

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
