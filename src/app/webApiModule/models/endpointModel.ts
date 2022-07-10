import { EnumMetodoHttp } from './enumMetodoHttp';
import { ICampo } from './campoModel';
import { subsistemaModel } from './subsistemaModel';
import { EnumTipoDto } from './enumTipoDto';
export interface IEndpoint {
    uriRelativa: string;
    metodoHttp: EnumMetodoHttp;
    subsistema?: string;
    gestion?:string;
    descripcion: string
}
