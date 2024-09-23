import { ApiError } from "../error/ApiError.js";


export default function(err, req, res, next) {
    if(err instanceof ApiError){
        res.status(err.status).json({message: err.message})
    }
    res.status(500).json({message: 'Uncaught Error'})
}