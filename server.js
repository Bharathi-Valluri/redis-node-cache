const express =require('express')
const fetch = require('node-fetch')
const Redis = require('redis')
const router =require('../source/router/router')


require('dotenv').config()

const port = process.env.PORT

const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

function run () {
  app.use("/", router)
  //run server
  app.listen(port, () => {
    console.log(`server is listining at ${port}`)
  })
}

run()
