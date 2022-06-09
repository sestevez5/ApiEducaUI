import { ICampoSimple } from './campoSimpleModel';
import { subsistemaModel } from './subsistemaModel';
import { EnumTipoDto } from './enumTipoDto';
export interface IDto {
    denominacion: string;
    tipo: string;
    tipoDTO: EnumTipoDto;
    subsistema: string;
    campos: Array<IDto|ICampoSimple>
}
