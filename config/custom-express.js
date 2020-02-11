//IMPORTAMOS A CONSTANTE EXPRESS
const express = require('express')
const app = express()
const consign = require('consign')
const bodyParser = require('body-parser')

customExpress = () => {

    app.use(express.json())

    consign()
        .include('controller/public')
        .then('middlewares')
        .then('controller')
        .then('models')
        .into(app)
        
    return app
}

module.exports = customExpress()
