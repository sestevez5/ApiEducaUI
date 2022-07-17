import { Component } from '@angular/core';
export interface IOpenApiObject3 {
    openApi?: string,
    info?: IInfoObject,
    servers?: IServeObject[],
    paths?: IPathsObject,
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

export interface IPathsObject {
    
}

export interface IComponentObject {

    schemas?: ISchemaReferenceObject[]
    
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
export interface ISchemaReferenceObject {

    name: string;
    structure: ISchemaObject | IReferenceObject

}

export interface ISchemaObject {

    type?: string;
    properties?: ISchemaReferenceObject[];
    format?: string;
    nullable?: boolean;
    description?: string;

}

export interface IReferenceObject {

    reference: string;



}







