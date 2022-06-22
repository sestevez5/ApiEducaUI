import { IenumDto } from './enumModel';
import { IDto } from './dtoModel';
export interface ICampo {
    nombreCampo:string;
    esColeccion: boolean;
    tipoCampo:IDto|string|IenumDto; 
    nullable: boolean | undefined}