import { IParametroEndpoint } from './parametroEndpoint';
import { EnumMetodoHttp } from './enumMetodoHttp';

export interface IEndpoint {
    uriRelativa: string;
    metodoHttp: EnumMetodoHttp;
    subsistema?: string;
    gestion?:string;
    descripcion: string;
    parametrosQuery: IParametroEndpoint[];
    parametrosPath: IParametroEndpoint[];

}

