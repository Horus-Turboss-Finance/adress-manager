import path from "path";
import { log, params } from "packages"

export const logSys = new log(params.serviceName.object.adress, path.resolve("src", "log"))
export let CE_Services = params.inAppServiceName