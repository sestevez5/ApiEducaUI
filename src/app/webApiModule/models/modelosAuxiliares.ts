import { ISchemaObjectWithKey } from './documentoOpenApi3';

export interface IPropertyAux {
    schemaPadre: ISchemaObjectWithKey
    tipoSchemaPadre: string
    nombre: string;
    tipoSchemaHijo?: string;  // Nombre eschema hijo
    schemaHijo?: ISchemaObjectWithKey
}
