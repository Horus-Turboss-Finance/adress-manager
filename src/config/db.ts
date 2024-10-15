import { logSys } from "./log";
import { CE_Services } from "log";
import { DBCONFIG } from "./envLoader";

import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose.connect(DBCONFIG.URLDB)
  .then(() => {
    logSys.ServiceInfo(CE_Services.inService.mongoose, "Connected")
  }).catch((error) => {
    logSys.UnknowAppError(CE_Services.inService.mongoose, error)
  });
}