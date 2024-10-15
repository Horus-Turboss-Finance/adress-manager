import { logSys } from "../config/log"
import { ResponseException } from "error-handler"
import { NextFunction, Request, Response } from "express"
let i = 0
export const ResponseProtocole = (err : Error & any, req : Request, res : Response, next : NextFunction) => {
    const logErr = err
    if(!('status' in err)){
        err = new ResponseException().UnknownError()
    }
    
    if(err.status >= 500){
        logSys.UnknowRequestError(req.method, req.protocol, req.originalUrl, JSON.stringify(req.params), JSON.stringify(req.body), JSON.stringify(req.cookies), JSON.stringify(req.headers), logErr)
    }

    return res.status(err.status).json(err)
    next()
}