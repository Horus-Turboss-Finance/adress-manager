import app from './app'
import { logSys } from './config/log';
import { CE_Services } from 'log';
import os, { NetworkInterfaceInfo } from "os";
import { APPCRITIC } from './config/envLoader';

import "./services/routines/watchServices"


let main = async () => {
    /*
    CONNECT API
    */
    app.listen(APPCRITIC.PORT, () => {
      const interfaces : NodeJS.Dict<NetworkInterfaceInfo[]> = os.networkInterfaces();
      for (const k in interfaces) {
          for (const k2 in interfaces[k]) {
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              /* @ts-ignore */
              const address = interfaces[k][k2];
    
              if (address.family === 'IPv4' && !address.internal) {
                logSys.ServiceInfo(CE_Services.inService.app, `Connect Url : ${address.address}:${APPCRITIC.PORT}`)
              }
          }
      }
    })
}

main()