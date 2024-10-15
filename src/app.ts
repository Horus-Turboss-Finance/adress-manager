import adressRoutes from "./services/adress/adress.routes";
import { ResponseProtocole } from "./middleware/response";
import { catchSync } from "./middleware/catchAsync";
import { ResponseException } from "error-handler";
import { connectDatabase } from "./config/db";
import { CE_Services } from "log";
import { logSys } from "./config/log";
import express from "express";


const app = express()

/*
    CONNECT DB
*/

connectDatabase()

/*
    MIDDLEWARE
*/

app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))

/*
    ADRESS SERVICES ROUTES
*/

app.use("/", adressRoutes)

/*
    ERROR 404
*/

app.use('*', catchSync(async() => {
    throw new ResponseException("Chemin ou méthodes non supporté.").NotFound()
}))

/*
    ERROR HANDLER
*/

app.use(ResponseProtocole);

/*
    CRITIC LOGS
*/
process.on("uncaughtException", (e) => {
    logSys.UnknowAppError(CE_Services.inService.index, e)
});
export default app;