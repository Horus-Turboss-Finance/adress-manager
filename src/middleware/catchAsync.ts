import { NextFunction, Request, Response } from "express";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const catchSync = (errorFunction : any) => (req? : Request, res? : Response, next? : NextFunction) => {
    Promise.resolve(errorFunction(req, res, next)).catch(next);
}