const router = require('express').Router()
const authCtrl = require('../controller/public/autenticacao')
const validators = require('../validators/Usuarios')


router.post('/registrar', validators.validacoes(), authCtrl.registra)
router.post('/autenticar', authCtrl.autenticar)

module.exports = router