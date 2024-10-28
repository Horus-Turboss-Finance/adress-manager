import path from "path";
import { log } from "log";
import { serviceObj } from "params";

export const logSys = new log(serviceObj.adress, path.resolve("src", "log"))
export { CE_Services } from 'log'