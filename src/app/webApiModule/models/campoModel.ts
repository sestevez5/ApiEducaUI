import { IDto } from './dtoModel';
export interface ICampo {
    nombreCampo:string;
    tipoCampo:IDto|string; 
    nullable: boolean | undefined}