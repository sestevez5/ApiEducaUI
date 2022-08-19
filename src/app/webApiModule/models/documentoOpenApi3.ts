import { Component } from '@angular/core';
export interface IOpenApiObject3 {
    openApi?: string,
    info?: IInfoObject,
    servers?: IServerObject[],
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

export interface IServerObject {

    url: string;
    description?: string;
    
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
// Estructuras derivadas de "COMPONENTS --> SCHEMAS"".
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

// ----------------------------------------------
// Estructuras derivadas del nodo "PATHS"
// ----------------------------------------------
export interface IPathObject {
    path: string;
    parameters: Array<IParameterObject>;
    get?: IOperationObject;
    put?: IOperationObject;
    post?: IOperationObject;
    delete?: IOperationObject;
     
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
    requestBody?: IRequestBody;

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


export interface ICodeWithResponseObject{
    codigoHttpOrDefault: string; // No lo contempla el estándar. Es una réplica del nodo padre.
    response: IResponseObject  
}

export interface IResponseObject{
   description: string;
   content: Array<IMediaTypeObject>
}

export interface IMediaTypeObject{
    mediaType: string;
    schema: ISchemaObjectWithKey;
}

export interface IRequestBody{
    description?: string;
    content?: Array<IMediaTypeObject>
    required?: boolean;
}
 
 












