const { validationResult } = require('express-validator')
const usuarioValid = require('../../validators/Usuarios')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../config/auth')


gerarToken = (params) => jwt.sign(params,auth.secret,{expiresIn:60})

const autenticacao = (app) => {

	app.post('/registrar',
		usuarioValid.validacoes(), (req, res) => {
			let usuario = req.body

			const erros = validationResult(req)

			if (!erros.isEmpty()) {
				res.status(400).send(erros)
				return
			}

			bcrypt.hash(usuario.senha, 10, (erro, hash) => {
				usuario.senha = hash

				const dao = app.models.Usuarios

				dao.inserir(usuario)
					.then(retorno => {

						delete retorno.senha
						console.log(auth.secret)
						res.status(201).send({
							retorno,
							token:gerarToken({id:usuario.id})
						})
					})
					.catch(erro => {
						console.log(erro)
						res.status(500).send(erro)
					})
			})
		})

	app.post('/autenticar', (req, res) => {
		const { email, senha } = req.body

		dao = app.models.Usuarios

		dao.buscarPorEmail(email)
			.then(usuario => {
				if (!usuario)
					return res.status(401).send(erro)

					bcrypt.compare(senha, usuario.senha, (erro,retorno) =>{
						if(!retorno)
							return res.status(401).send(erro)
						
					
								delete usuario.senha
						res.send({usuario , token: gerarToken({id: usuario.id})})
					})
			})

	})
}

module.exports = autenticacao