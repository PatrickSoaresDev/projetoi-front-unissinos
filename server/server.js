const express = require('express')


const cors = require('cors')
require('./dbTables')

const app = express()

app.use(express.json());
app.use(cors())

const userService = require('./services/User.services')
const categoryService = require('./services/Category.services')
const debitService = require('./services/Debit.services')
const creditService = require('./services/Credit.services')

const port = 3000;

// User
app.post('/users', userService.createUser)
app.post('/users/login', userService.createSession)

// Category
app.get('/category', categoryService.getList)
app.post('/category', categoryService.createCategory)

// Debit
app.get('/debit/:month/:year', debitService.getListByYearAndMouth)
app.post('/debit', debitService.createDebit)
app.delete('/debit/:id', debitService.deleteDebit)

// Debit
app.get('/credit/:month/:year', creditService.getListByYearAndMouth)
app.post('/credit', creditService.createCredit)
app.delete('/credit/:id', creditService.deleteCredit)

//balance
app.get('/balance', async (req, res) => {
    const total_debit = await debitService.getSum() | 0
    const total_credit = await creditService.getSum() | 0

    const balance = (parseFloat(total_credit) - parseFloat(total_debit)).toFixed(2)

    res.send(balance)
})



app.listen(port, () => console.log(`🔥The server is up and running in port ${port} 🔥`))