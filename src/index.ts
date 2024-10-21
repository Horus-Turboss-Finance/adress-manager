import app from './app'
import { logSys } from './config/log';
import { CE_Services } from 'log';
import os, { NetworkInterfaceInfo } from "os";
import { env, loadEnv } from "params"

import "./services/routines/watchServices"
loadEnv()

let main = async () => {
    /*
    CONNECT API
    */
    app.listen(env.PORT_ADRESSMANAGER, env.IP_ADRESSMANAGER, () => {
      logSys.ServiceInfo(CE_Services.inService.app, `Connect Url : ${env.IP_ADRESSMANAGER}:${env.PORT_ADRESSMANAGER}`)
    })
}

main()