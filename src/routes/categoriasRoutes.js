const router = require('express').Router()
const categoriaCtrl = require('../controller/categorias')

router.get('/' , categoriaCtrl.lista)
router.post('/' ,categoriaCtrl.inserir)

module.exports = router