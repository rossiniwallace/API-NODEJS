const { validationResult } = require('express-validator')
const usuarioValid = require('../validators/Usuarios')

const usuarios = (app) => {


    app.get('/', (req, res) => {
        res.send('Root Rote')
    })

    app.get('/usuarios', (req, res) => {

        const dao = app.models.Usuarios

        dao.lista()
            .then(lista => {
                res.send(lista)
            })
            .catch(erro => {
                console.log(erro)
                res.status(500).send(erro)
            })
    })

    app.get('/usuarios/email/:email', (req, res) => {

        const email = req.params.email

        const dao = app.models.Usuarios

        dao.buscarPorEmail(email)
        .then(retorno => {
            if(retorno){
                res.send(retorno)
        }else{
            res.status(404).send()
        }
        res.send(retorno)
    })
        .catch(erro => res.status(500).send(erro))
    })

    app.post('/usuarios',
     usuarioValid.validacoes(), (req, res) => {
        let usuario = req.body

        const erros = validationResult(req)

        if (!erros.isEmpty()) {
            res.status(400).send(erros)
            return
        }

        const dao = app.models.Usuarios

        dao.inserir(usuario)
            .then(retorno => res.status(201).send(retorno))
            .catch(erro => {
                console.log(erro)
                res.status(500).send(erro)
            })

    })

}

module.exports = usuarios