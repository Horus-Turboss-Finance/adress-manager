import axios from "axios"
import { APPCRITIC } from "../config/envLoader"

export let updateAfterControl = async ({adressIP, port, service, signature, status} : {adressIP : string, port : number, service : string, signature : string, status : number}) =>{
  await axios({
    url: '/service',
    method: 'put',
    baseURL: `http://127.0.0.1:${APPCRITIC.PORT}`,
    data: {
      signature,
      adressIP, 
      service,
      status,
      port
    }
  })
}

export let downAfterControle = async ({adressIP, signature, service, port} : {adressIP : string, signature : string, service : string, port : number}) => {
  await axios({
    url: '/service',
    method: 'delete',
    baseURL: `http://127.0.0.1:${APPCRITIC.PORT}`,
    data: {
      signature,
      adressIP, 
      service,
      port, 
    }
  })
}

export let ping = async ({adressIP, port} : {adressIP : string, port : number}) => {
  let res = await axios({
    url: '/ping',
    method: 'get',
    baseURL: `http://${adressIP}:${port}`
  })

  return res
}