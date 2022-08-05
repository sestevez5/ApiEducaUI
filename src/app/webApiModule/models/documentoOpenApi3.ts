import { Component } from '@angular/core';
export interface IOpenApiObject3 {
    openApi?: string,
    info?: IInfoObject,
    servers?: IServeObject[],
    paths?: Array<IPathObject>,
    components?: IComponentObject,
    security?: ISecurityRequerimentObject[],
    tags?: ITagObject[],
    externalDocs?: IExternalDocumentationObject

}

// ----------------------------------------------
// Estrcuturas derivadas de la raíz OpenApi3.
// ----------------------------------------------
export interface IInfoObject {

}

export interface IServeObject {
    
}

export interface IPathObject {
    path: string;
    parameters: Array<IParameterObject>;
    get?: IOperationObject;
    put?: IOperationObject;
    post?: IOperationObject;
    delete?: IOperationObject;
     
}

export interface IComponentObject {
    schemas?: Array<ISchemaObjectWithKey>;
}



export interface ISecurityRequerimentObject {
    
}

export interface ITagObject {
    
}

export interface IExternalDocumentationObject {

}

// ----------------------------------------------
// Estructuras derivadas de IComponentObject.
// ----------------------------------------------
export interface ISchemaObject {
    type?: string;
    properties?: Array<IProperty>;
    format?: string;
    nullable?: boolean;
    description?: string;
    items?: ISchemaObjectWithKey;

}

export interface ISchemaObjectWithKey extends ISchemaObject {
    key?: string;
}

export interface IProperty {
    name: string;
    value: ISchemaObjectWithKey
}

export interface IParameterObject {

    name:string;
    in: string;
    description: string;
    required: boolean;
    deprecated: boolean;
    allowEmptyValue: boolean;
    schema: ISchemaObjectWithKey;
}

export interface IOperationObject {

    metodo?: string;
    tags?: Array<string>;
    path?: string // No lo contempla el estándar. Es una réplica del nodo padre.
    summary?: string;
    description?: string;
    operationId?: string;
    parameters?: Array<IParameterObject>;
    responses?: Array<ICodeWithResponseObject>

}

export interface ICodeWithResponseObject{
    codigoHttpOrDefault: string; // No lo contempla el estándar. Es una réplica del nodo padre.
    response: IResponseObject  
}

export interface IResponseObject{
   description: string;
   content: Array<IMediaTypeResponseObject>
}

export interface IMediaTypeResponseObject{
    mediaType: string;
    schema: ISchemaObjectWithKey;
}
 












