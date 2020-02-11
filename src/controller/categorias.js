const categoriaDAO = new (require('../models/Categorias'))()
const { validationResult } = require('express-validator')
module.exports = {

    async lista(req, res) {
        try {
            const categorias = await categoriaDAO.lista()
            if (!categorias)
                return res.status(404).send({ erro: 'Lista vazia' })

            res.send(categorias)
        } catch (erro) {
            console.log(erro)
            res.status(500).send(erro)
        }
    },

    async inserir(req, res) {



        const erros = validationResult(req)

        if (erros)

            return res.status(400).send(erros)
        let categoria = req.body

        try {

            const result = await categoriaDAO.inserir(categoria)
            categoria = { id: result.insertId, ...categoria }
            res.status(201).send(categoria)
            
        } catch (erro) {
            console.log(erro)
            res.status(500).send(erro)
        }
    }

}