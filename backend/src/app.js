require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(routes)

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@studiesmongodb.lkzypst.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log('Mongodb is connected'))
  .catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))
