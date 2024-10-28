import path from 'path';
import app from './app';
import { params } from "packages"
import { logSys, CE_Services } from './config/log';

import "./services/routines/watchServices"

let { env, loadEnv } = params

loadEnv(path.resolve(__dirname, "./.env"))

let main = async () => {
    /*
    CONNECT API
    */
    app.listen(env.PORT_ADRESSMANAGER, env.IP_ADRESSMANAGER, () => {
      logSys.ServiceInfo(CE_Services.app, `Connect Url : ${env.IP_ADRESSMANAGER}:${env.PORT_ADRESSMANAGER}`)
    })
}

main()