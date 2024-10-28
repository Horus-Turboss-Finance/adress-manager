import { logSys, CE_Services } from "./log";
import { params } from "packages";

import mongoose from "mongoose";

let { env } = params

export const connectDatabase = () => {
  mongoose.connect(env.URLDB)
  .then(() => {
    logSys.ServiceInfo(CE_Services.mongoose, "Connected")
  }).catch((error) => {
    logSys.UnknowAppError(CE_Services.mongoose, error)
  });
}