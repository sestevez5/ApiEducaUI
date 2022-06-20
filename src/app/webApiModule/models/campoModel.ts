import { IenumDto } from './enumModel';
import { IDto } from './dtoModel';
export interface ICampo {
    nombreCampo:string;
    tipoCampo:IDto|string|IenumDto; 
    nullable: boolean | undefined}