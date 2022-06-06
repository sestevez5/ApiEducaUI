import { subsistemaModel } from './subsistemaModel';
import { EnumTipoDto } from './enumTipoDto';
export interface IDto {
    denominacion: string;
    tipo: EnumTipoDto;
    subsistema: subsistemaModel
}
