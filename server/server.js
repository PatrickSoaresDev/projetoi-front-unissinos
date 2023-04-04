const express = require('express')
const cors = require('cors')
require('./dbTables')

const app = express()

app.use(express.json());
app.use(cors())

const userService = require('./services/User.services')

const port = 3000;

app.post('/users', userService.createUser)
app.post('/users/login', userService.createSession)





app.listen(port, () =>  console.log(`🔥The server is up and running in port ${port} 🔥`))