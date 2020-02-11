const conexao = require('../config/conexao-db')


module.exports = (sql,params) =>{
        return new Promise((res,rej)=>{

            
            conexao.query(sql,params || '', (erro, retorno)=>{
                if(erro) return rej(erro)
                res(retorno)
            })
        })
}