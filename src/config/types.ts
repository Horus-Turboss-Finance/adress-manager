export interface dbconf {
    URLDB : string,
}

export interface appCritic {
    PORT : number,
}

export interface IService {
    _id: string;
    service: string;
    port: number,
    adressIP: string,
    status: Number
}

export interface ServiceResponse {
    _id?: string;
    service: string;
    port: number,
    adressIP: string,
    status: Number
}