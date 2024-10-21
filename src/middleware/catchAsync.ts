import { NextFunction, Request, Response } from "express";

export const catchSync = (errorFunction : any) => (req? : Request, res? : Response, next? : NextFunction) => {
    Promise.resolve(errorFunction(req, res, next)).catch(next);
}