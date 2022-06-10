import { ICampoSimple } from './campoSimpleModel';
import { subsistemaModel } from './subsistemaModel';
import { EnumTipoDto } from './enumTipoDto';
export interface IDto {
    denominacion: string;
    tipo: string;
    tipoDTO: EnumTipoDto;
    subsistema: string;
    gestion:string;
    campos: Array<IDto|ICampoSimple>
}
