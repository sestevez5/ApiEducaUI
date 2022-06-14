import { ICampo } from './campoModel';
import { subsistemaModel } from './subsistemaModel';
import { EnumTipoDto } from './enumTipoDto';
export interface IDto {
    nombreDto: string;
    tipoDto: EnumTipoDto;
    subsistema: string;
    gestion:string;
    campos: Array<ICampo>
}
