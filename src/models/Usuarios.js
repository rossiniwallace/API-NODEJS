const baseQuery = require('./baseQuery')

class Usuarios {

    lista() {
      return baseQuery('SELECT * FROM usuario')
    }

    inserir(usuario) {
        baseQuery('INSERT INTO usuario SET ?',usuario)
    }

    buscarPorEmail(email) {
        baseQuery('SELECT * FROM usuario WHERE email= ?', email)
    }
}

module.exports = new Usuarios()