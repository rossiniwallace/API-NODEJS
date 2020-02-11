const { check, body } = require('express-validator')
const dao = new(require('../models/Usuarios'))()

class Usuarios {

    static validacoes() {
        return [
            check('nome').isLength({ min: 5, max: 100 })
                .withMessage('Campo nome teve ter entre 5 a 100 caracteres'),
            check('email').isEmail()
                .withMessage('Campo email não é valido'),
            check('cpf').isNumeric()
                .withMessage('Deve ser apenas números'),
            check('sexo').isLength({ min: 1, max: 1 })
                .withMessage('Deve ter apenas um caracter(M ou F)'),
            check('senha').isLength({ min: 6, max: 15 })
                .withMessage('A senha deve ter entre 6 e 15 caracteres'),
            body('email').custom(email => {
                return dao.buscarPorEmail(email)
                    .then(retorno => {
                        retorno = retorno[0]
                        if (retorno)
                            return Promise.reject('Email já cadastrado')
                    })
            })
        ]
    }
}

module.exports = Usuarios