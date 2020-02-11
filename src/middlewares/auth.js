const jwt = require ('jsonwebtoken')
const auth = require('../config/auth')



 
module.exports = async(req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader)
        return res.status(401).send({erro:"Token não informado"})
    
    const parts = authHeader.split(' ')

    if(parts.length !== 2)
        return res.status(401).send({erro:"Erro no Token"})

    const [bearer,token] = parts

    console.log(bearer)

    if(!/^Bearer$/i.test(bearer))
        return res.status(401).send({erro:"Token mal formatado"})

    try{
        const decoded = await jwt.verify(token, auth.secret)

        req.userID = decoded.id

       return next()
    }catch(erro){
        res.status(401).send({erro:'Token inválido'})
    }

   
}