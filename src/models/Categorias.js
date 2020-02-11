const baseQuery = require('./baseQuery')

class Categoria {

    lista() {
      return baseQuery('SELECT * FROM categoria')
    }

    inserir(categoria) {
        baseQuery('INSERT INTO categoria SET ?',categoria)
    }

    buscarPorEmail(id) {
        baseQuery('SELECT * FROM categoria WHERE id= ?', id)
    }

    atualizar(categoria){
        baseQuery('UPDATE categoria SET ? WHERE id = ?',
        [categoria,categoria.id])
    }

    detelar(id){
        baseQuery('DELETE FROM categoria WHERE id = ?', id)
    }
}

module.exports = Categoria