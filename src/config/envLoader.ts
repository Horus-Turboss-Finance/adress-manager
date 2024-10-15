import { appCritic, dbconf } from "./types";
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({path : path.resolve('./src/config/.env')})

export const DBCONFIG : dbconf = {
    URLDB : process.env.URLDB!,
}

export const APPCRITIC : appCritic = {
    PORT: parseInt(process.env.PORTAPP!, 10),
}