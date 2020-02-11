const  express = require('express')
const app = express()
const auth = require('../routes/authRoutes')
const categoria = require('../routes/categoriasRoutes')

app.use(express.json())

app.get('/teste',(req,res)=>{
    res.send('ok')
})

app.use('/',auth)

app.use('/categoria',categoria)

module.exports = app