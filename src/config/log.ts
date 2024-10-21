import path from "path";
import { log } from "log";
import { CreateSignature, ServicesOptions } from "signed-service";

export const logSys = new log(CreateSignature(ServicesOptions.AdressManager), ServicesOptions.AdressManager, path.resolve("src", "log"))
export { CE_Services } from 'log'