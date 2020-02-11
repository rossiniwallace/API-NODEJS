const http = require('http')

const server = http.createServer((req,res) => {
    res.end('<h1>Atendendo a requisicao</h1>')
})

server.listen(3000,() =>{
    console.log("Servidor rodando na porta 3000")
})