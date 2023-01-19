import { ISchemaObjectWithKey } from './documentoOpenApi3';

export interface IPropertyAux {
    nombre: string;
    tipo: string;
    schema?: ISchemaObjectWithKey
}
