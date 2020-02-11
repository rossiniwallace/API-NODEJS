const baseQuery = require('./baseQuery')

class Usuarios {

    lista() {
      return baseQuery('SELECT * FROM usuario')
    }

    inserir(usuario) {
        return baseQuery('INSERT INTO usuario SET ?',usuario)
    }

    buscarPorEmail(email) {
        return baseQuery('SELECT * FROM usuario WHERE email= ?', email)
    }

    atualizar(usuario){
        return baseQuery('UPDATE usuario SET ? WHERE id = ?',
        [usuario,usuario.id])
    }

    detelar(id){
        return baseQuery('DELETE FROM usuario WHERE id = ?', id)
    }
}

module.exports = Usuarios