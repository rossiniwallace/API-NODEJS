const  express = require('express')
const app = express()
const auth = require('../routes/authRoutes')
const categoria = require('../routes/categoriasRoutes')
const authMid = require('../middlewares/auth')

app.use(express.json())

app.use('/',auth)

app.use(authMid)

app.use(auth)

app.use('/categoria',categoria)

module.exports = app