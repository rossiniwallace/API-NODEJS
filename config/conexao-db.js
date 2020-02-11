const mysql = require('mysql')

const conexao = mysql.createConnection({
    host:'54.208.113.96',
    port:3306,
    user:'thoy',
    password:'bcd127',
    database:'brabank'
})

module.exports = conexao