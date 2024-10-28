import { NextFunction, Request, Response } from "express";
import Service from "./adressModel";
import { catchSync } from "../../middleware/catchAsync";
import { ResponseException } from "error-handler";
import { mongooseMessageErrorFormator } from "constraint"
import { CE_Services, logSys } from "../../config/log";

interface ServiceResponse {
  _id?: string;
  service: string;
  port: number,
  adressIP: string,
  status: Number
}

let tmpIndexLecture : any = {}

export const addService = catchSync(async (req: Request, res : Response, next : NextFunction) => {
  let { port, adressIP, service } = req.body;
  
  let update = {
    port,
    service,
    adressIP,
  }

  let filter = {
    port,
    service,
    adressIP,
  }

  dataService(update, filter, next)
});

export const readService = catchSync(async (req: Request) => {
  const { service } = req.body;
  if (!service)
    throw new ResponseException("Aucun service fournit").BadRequest();

  let serviceDB = await Service.find({
      service : {
        $regex: service,
        $options: "i",
      },
      status : 1
  });

  if (!serviceDB || !serviceDB[0])
    throw new ResponseException("Aucun Service trouvé").NotFound();

  if(tmpIndexLecture[service] == undefined){
    tmpIndexLecture[service] = 0
  }else{
    tmpIndexLecture[service] ++
    if(tmpIndexLecture[service] > serviceDB.length) tmpIndexLecture[service] = 0;
  }

  let serviceResponse : ServiceResponse = serviceDB[tmpIndexLecture[service]]
  delete serviceResponse._id
  throw new ResponseException(JSON.stringify(serviceResponse)).Success();
});

export const deleteService = catchSync(async (req: Request, res : Response, next : NextFunction) => {
  const { adressIP, port, service } = req.body;
  if(!adressIP || !port || !service) throw new ResponseException("Au moins un champ est manquant").BadRequest()

  next(new ResponseException("Service supprimé des annuaires").Success());

  try{
    await Service.findOneAndDelete({
      $and: [
        { adressIP },
        { service },
        { port }, 
      ],
    });
  }catch(e : any){
    logSys.UnknowAppError(CE_Services.inService.mongoose, e)
  }
});

export const updateService = catchSync(async (req: Request, res : Response, next : NextFunction) => {
  let { port, adressIP, service, status } = req.body;
  
  let update = {
    port,
    service,
    adressIP,
    status
  }

  let filter = {
    port,
    service,
    adressIP,
  }

  dataService(update, filter, next)
})

let dataService = async (update : object, filter: object, next : NextFunction) => {
  try{
    const validateCheck = new Service(update)
    const error = validateCheck.validateSync()
    if(error) throw error

    next(new ResponseException("Service enregistré").OK());

    await Service.findOneAndUpdate(filter, update, {
      upsert: true, new: true, setDefaultsOnInsert: true
    });
  }catch(e : any){
    if(e.name && e.name == "ValidationError") {
      if(e.errors.port){
        throw new ResponseException(mongooseMessageErrorFormator(e.errors.port.message, e.errors.port.value, "Port", "number"))
        .BadRequest();
      }

      if(e.errors.service){
        throw new ResponseException(mongooseMessageErrorFormator(e.errors.service.message, e.errors.service.value, "Service", "string"))
        .BadRequest();
      }

      if(e.errors.status){
        throw new ResponseException(mongooseMessageErrorFormator(e.errors.status.message, e.errors.status.value, "Status", "number"))
        .BadRequest();
      }

      if(e.errors.adressIP){
        throw new ResponseException(mongooseMessageErrorFormator(e.errors.adressIP.message, e.errors.adressIP.value, "IP adress", "ip"))
        .BadRequest();
      }
    }

    logSys.UnknowAppError(CE_Services.inService.mongoose, e)
    throw new ResponseException().UnknownError()
  }
}