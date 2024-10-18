import { Request } from "express";
import { intCheck, isValidIP } from "checks";
import Service from "./adressModel";
import { catchSync } from "../../middleware/catchAsync";
import { ResponseException } from "error-handler";
import { intContraint } from "constraint"
import { ServiceResponse } from "../../config/types";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
let tmpIndexLecture : any = {}

export const addService = catchSync(async (req: Request) => {
  let { port, adressIP, service } = req.body;
  if(!port || !adressIP || !service) throw new ResponseException("Le port, l'adresse IP ou le service est manquant").BadRequest()
  
  if (!intCheck(parseInt(port)))
    throw new ResponseException("Le port est un nombre").BadRequest();
  
  if (!isValidIP(adressIP))
    throw new ResponseException("L'adresse ip est invalide").BadRequest();

  let filter = {
    port,
    service,
    adressIP,
  }

  let update = {
    port,
    service,
    adressIP,
    status: 1,
  }

  await Service.findOneAndUpdate(filter, update, {
    upsert: true, new: true, setDefaultsOnInsert: true
  });

  throw new ResponseException("Service enregistrée").OK();
});

export const readService = catchSync(async (req: Request) => {
  const { service } = req.body;
  if (!service)
    throw new ResponseException("Aucune service fournit").BadRequest();

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

export const deleteService = catchSync(async (req: Request) => {
  const { adressIP, port, service } = req.body;
  if(!adressIP || !port || !service) throw new ResponseException("Un champ est manquant").BadRequest()

  const serviceDB = await Service.findOneAndDelete({
    $and: [
      { adressIP },
      { service },
      { port }, 
    ],
  });

  if (!serviceDB) throw new ResponseException("Aucun Service trouvé").NotFound();
  throw new ResponseException("Service supprimé des annuaires").Success();
});

export const updateService = catchSync(async (req: Request) => {
  let { port, adressIP, service, status } = req.body;
  if(!port || !adressIP || !service || !status) throw new ResponseException("Un champ est manquant").BadRequest()
  if(!intContraint(status, 0, 2)) throw new ResponseException("Le status doit être compris entre 0 et 2").BadRequest()

  const newServiceData = {
    status,
  };
  
  const selector = {
    $and: [
      { adressIP },
      { service },
      { port }, 
    ],
  };

  const serviceDB = await Service.findOneAndUpdate(selector, newServiceData, {
    new: true,
    runValidators: true,
  });


  if (!serviceDB) throw new ResponseException("Aucun service trouvé").NotFound();
  throw new ResponseException("Service bien modifié").OK();
});