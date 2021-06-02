require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http')
const MQTTClient = require('./src/mqtt/client')

const sensorRoute = require('./src/router/sensor')
const userRoute = require('./src/router/user')

const app = express()
const server = http.Server(app)

const host = process.env.HOST
const port = process.env.PORT

const mongoose = require("mongoose")
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)
.then(console.log(">> Database connected!"))
.catch(error => console.log(error))

app.use(cors())
app.use(bodyParser.json({ limit: "5mb" }))
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }))
app.use(cookieParser())
app.use(express.json())

app.use('/', userRoute)
app.use('/sensor', sensorRoute)

server.listen(port, () => {
  console.log(`>> Server running at ${host}:${port}`)
})
