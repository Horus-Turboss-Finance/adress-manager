import Service from "../adress/adressModel"
import { downAfterControle, ping, updateAfterControl } from "../../utils/requests"

export const routineCheck = async () => {
  const service = await Service.find()

  let pingAverage = Math.floor((30 * 60 * 950) / service.length), i = 0
  if(service.length > 0){
    let callService = async () => {
      try{
        await ping({adressIP : service[i].adressIP, port : service[i].port})
      }catch(e : any){
        if (!e.response) return 
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if(e.response.status == 418){
          updateAfterControl({
            adressIP: service[i].adressIP,
            service : service[i].service,
            port : service[i].port,
            status : 2            
          }).catch(()=>{})
        }else{
          downAfterControle({
            adressIP: service[i].adressIP,
            service : service[i].service,
            port : service[i].port,
          }).catch(()=>{})
        }
      }finally{
        i ++
      }
    }

    setTimeout(() => {
      if(i > service.length) return
      callService()
    }, pingAverage);
  }


  setTimeout(() => {
    routineCheck()
  }, 30*60*1000);
}

routineCheck()