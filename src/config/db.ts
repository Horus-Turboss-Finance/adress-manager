import { logSys, CE_Services } from "./log";
import { env } from "params";

import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose.connect(env.URLDB)
  .then(() => {
    logSys.ServiceInfo(CE_Services.inService.mongoose, "Connected")
  }).catch((error) => {
    logSys.UnknowAppError(CE_Services.inService.mongoose, error)
  });
}