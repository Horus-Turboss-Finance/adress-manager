import axios from "axios"
import { params } from "packages"


let { env } = params

export let updateAfterControl = async ({adressIP, port, service, status} : {adressIP : string, port : number, service : string, status : number}) =>{
  await axios({
    url: '/service',
    method: 'put',
    baseURL: `http://127.0.0.1:${env.PORT_ADRESSMANAGER}`,
    data: {
      adressIP, 
      service,
      status,
      port
    }
  })
}

export let downAfterControle = async ({adressIP, service, port} : {adressIP : string, service : string, port : number}) => {
  await axios({
    url: '/service',
    method: 'delete',
    baseURL: `http://127.0.0.1:${env.PORT_ADRESSMANAGER}`,
    data: {
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