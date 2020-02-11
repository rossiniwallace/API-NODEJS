const { validationResult } = require('express-validator')
const usuarioValid = require('../../validators/Usuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../config/auth')
const usuarioDAO = new (require('../../models/Usuarios'))()


gerarToken = (params) => jwt.sign(params, auth.secret, { expiresIn: 60 })


module.exports = {

	async registra(req, res) {
		const erros = validationResult(req)

		if (!erros.isEmpty()) 
			return res.status(400).send(erros)

		let usuario = req.body

		try {
			const hash = await bcrypt.hash(usuario.senha, 10)
			usuario.senha = hash
			const result = await usuarioDAO.inserir(usuario)
			usuario = { id: result.insertId, ...usuario }

			res.status(201).send({
				usuario,
				token: gerarToken({ id: usuario.id })
			})
		} catch (erro) {
			console.log(erro)
			res.status(500).send(erro)
		}
		
	},

	async autenticar(req, res) {
		const { email, senha } = req.body

		const usuario = await usuarioDAO.buscarPorEmail(email)

		if (!usuario)
			return res.status(401).send(erro)

		bcrypt.compare(senha, usuario.senha, (erro, retorno) => {
			if (!retorno)
				return res.status(401).send(erro)


			delete usuario.senha
			res.send({ usuario, token: gerarToken({ id: usuario.id }) })
		})
	}
}

