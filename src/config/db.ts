import { logSys, CE_Services } from "./log";
import { params } from "packages";

import mongoose from "mongoose";
import path from "path";

let { env, loadEnv } = params
env = loadEnv(path.resolve(__dirname, '../../../.env'))

export const connectDatabase = () => {
  mongoose.connect(env.URLDB)
  .then(() => {
    logSys.ServiceInfo(CE_Services.mongoose, "Connected")
  }).catch((error) => {
    logSys.UnknowAppError(CE_Services.mongoose, error)
  });
}