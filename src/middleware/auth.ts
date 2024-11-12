import path from 'path';
import { catchSync } from './catchAsync';
import { ResponseException, params} from "packages";
import { logSys, CE_Services } from "../config/log";
import { NextFunction, Request, Response } from 'express';

let { env, loadEnv } = params
env = loadEnv(path.resolve(__dirname, '../../../.env'))

let ipWhiteList = env.IP_SERVICE_WHITELIST.split(';')

export const controleOrigine = catchSync(async (req : Request, res : Response, next : NextFunction) => {
  if(env.NODE_ENV !== "PRODUCTION") return next()
  let socketAddr = req.socket ? req.socket.remoteAddress : req.ip
  let proxyAddrs = req.headers['host']

  let addr = [socketAddr].concat(proxyAddrs)

  if(!addr.some(item => ipWhiteList.includes(item ?? "")) || !req.body.trust || req.body.trust !== env.PASSWORD_SERVICE) {
    logSys.ServiceInfo(CE_Services.app, `User : "${addr[0] ?? "NOT FOUND"} try to use service registery`)
    throw new ResponseException("Vous n'êtes pas abilité à utiliser cette ressource.").Forbidden()
  }
  next()
})