import Service from "../adress/adressModel"
import { downAfterControle, ping, updateAfterControl } from "../../utils/requests"

export const routineCheck = async () => {
  const service = await Service.find()

  if(service.length > 0) {
    let pingAverage = Math.floor((60 * 950) / service.length), i = 0
    // let pingAverage = Math.floor((30 * 60 * 950) / service.length), i = 0
  
    let callService = async () => {
      try{
        await ping({adressIP : service[i].adressIP, port : service[i].port})
      }catch(e : any){
        if(e.code == "ECONNREFUSED"){
          downAfterControle({
            adressIP: service[i].adressIP,
            service : service[i].service,
            port : service[i].port,
          }).catch(()=>{})
        }
        
        if (e.response)  {
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
        }
      }finally{
        i ++
      }
  
      return setTimeout(() => {
        if(i > service.length) return
        callService()
      }, pingAverage);
    }
  
    callService();
  }

  return setTimeout(() => {
    routineCheck()
  }, 60*1000);
  // }, 30*60*1000);
}

routineCheck()