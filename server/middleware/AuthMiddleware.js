import jwt from 'jsonwebtoken'

export default function(req, res, next){
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
        next()
    }catch(err){
        res.status(401).json({
            message: 'Не авторизован'
        })
    }
}