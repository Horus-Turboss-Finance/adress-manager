import { CE_Services } from "log";
import { logSys } from "../config/log";
import { catchSync } from './catchAsync';
import { ResponseException } from 'error-handler';
import { CompareSignature } from "signed-service";
import { NextFunction, Request, Response } from 'express';

export const controleOrigine = catchSync(async (req : Request, res : Response, next : NextFunction) => {
  let { signature } = req.body
  let access = true

  if(!signature) access = false
  let accessBcrypt = CompareSignature(signature)

  if(!access || !accessBcrypt){
    logSys.ServiceInfo(CE_Services.inService.app, `User : "${req.headers['x-forwarded-for']} try to use service registery`)
    throw new ResponseException("Vous n'êtes pas abilité à utiliser cette api.").Forbidden()
  }

  let method = req.method;

  switch (method) {
    case "GET":
      logSys.Compteur.GET()
      break;
    case "POST":
      logSys.Compteur.ADD()
      break;
    case "UPDATE":
      logSys.Compteur.UPDATE()
      break;
    case "DELETE":
      logSys.Compteur.DELETE()
      break;
    default:
      break;
  }

  next()
})