import { IComponentObject, IOpenApiObject3, ISchemaObject, ISchemaObjectWithKey } from './../models/documentoOpenApi3';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OpenApi3Service {


  // Observable que emite la colección de rutas.
  rutasPreestablecidasDocumentosOpenApi3$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  
  // Contiene la ruta actual del documento para poder ser leido. Su valor se actualiza a partir del observable rutaDocumentoOpenApiActual$
  rutaDocumentoOpenApiActual: string ='../assets/json/webapiPre.json';
  rutaDocumentoOpenApiActual$: BehaviorSubject<string>= new BehaviorSubject<string>(this.rutaDocumentoOpenApiActual);
  

  // Contiene el objeto global que representa al documento openApi3
  OpenApiObject3Actual: IOpenApiObject3;
  OpenApiObject3Actual$: BehaviorSubject<IOpenApiObject3|undefined> = new BehaviorSubject<IOpenApiObject3|undefined>(undefined);

  auxDocumentoActual: any;
  
  //---------------------------------------
  // SCHEMAS
  //---------------------------------------
  // Observable que emite actualizaciones de colecciones de Schemas.
  schemas$: BehaviorSubject<Array<ISchemaObjectWithKey>> = new BehaviorSubject<Array<ISchemaObjectWithKey>>([]);
  schemasActuales: Array<ISchemaObjectWithKey>;  // mantiene los últimos schemas cargados.


  constructor(private http: HttpClient) {

    this.rutaDocumentoOpenApiActual$
      .subscribe(
        nuevoDocumentoOpenApi3 => {
          this.rutaDocumentoOpenApiActual = nuevoDocumentoOpenApi3;
          this.rutaDocumentoOpenApiActual?this.actualizarOpenApiObject3Actual():null;
        }
      )

    this.schemas$.subscribe(
      schemas => this.schemasActuales=schemas
    )

   }



  obtenerRutasPreestablecidasDocumentosOpenApi3(): BehaviorSubject<any[]> {
    return this.rutasPreestablecidasDocumentosOpenApi3$;
  }


  actualizarOpenApiObject3Actual() {

    console.log(this.rutaDocumentoOpenApiActual);

    this.http.get(this.rutaDocumentoOpenApiActual)
      .subscribe(
        contenidoDocumentoActual => {

          console.log('cda:', contenidoDocumentoActual)

          this.auxDocumentoActual=contenidoDocumentoActual;
          const cda: any = contenidoDocumentoActual

          let componentObject: IComponentObject | undefined;

          cda.components?componentObject=this.obtenerComponentObject(cda.components):componentObject=undefined;

          //PASO 2: establecer conjunto de esquemas nuevos
          componentObject? this.schemas$.next(this.procesarSchemas(componentObject.schemas)):null
        }
      )

  }

  private obtenerComponentObject(components: any): IComponentObject {


    let schemas: Array<ISchemaObjectWithKey> | undefined;

    components.schemas?schemas=this.obtenerSchemasObject(components.schemas):schemas=undefined

    return {
      schemas: schemas
    }
   

  }

  private obtenerSchemasObject(schemas: any): Array<ISchemaObjectWithKey>|undefined {

    let keySchema: string;
    let valueSchema: ISchemaObject;
    const schemaReferenceObjectMap:Array<ISchemaObjectWithKey> = [];

    for (const key in schemas) {

      keySchema=key;

      
      if ( schemas[key].$ref ) {  // Nos encontramos con una referencia, no con un schema.
        valueSchema = this.obtenerSchemaAPartirDeReferencia(schemas[key].$ref)
      } else {  // Nos encontramos con un schema
        valueSchema =  this.obtenerSchemaObject(schemas[key]);
      }

      schemaReferenceObjectMap.push({key:key, value: valueSchema}); // Incorporamos el valor al Map creado.   

    }


    return schemaReferenceObjectMap;
  }
  
  private obtenerSchemaObject(schema:any): ISchemaObject | undefined {

    let schemaObject: ISchemaObject = {
      type: schema.type?schema.type:null,
      properties: schema.properties?this.obtenerSchemasObject(schema.properties):null,
      format: schema.format?schema.format:null,
      nullable: schema.nullable?schema.nullable:null,
      description: schema.description?schema.description:null,

    }

    return schemaObject;

  }


  // Métodos auxiliares.
  private obtenerSchemaAPartirDeReferencia(referencia:string): ISchemaObject {
    const arraySeccionesReferencia=referencia.split('/');
    const key = arraySeccionesReferencia[arraySeccionesReferencia.length-1]
    const value = this.auxDocumentoActual.components.schemas[arraySeccionesReferencia[arraySeccionesReferencia.length-1]]
    return this.obtenerSchemaObject(value)
  };


  // Se devuelve un subconjunto de dtos a partir de los datos pasados como parámetros.
  obtenerSchemas(cadenaFiltro:string, pagina: number, tamanyoPagina:number): {datos:Array<ISchemaObjectWithKey>, numeroElementos:number} {
    const schemas = cadenaFiltro?this.schemasActuales.filter(schema => schema.key.toLowerCase().includes(cadenaFiltro.toLowerCase())):this.schemasActuales;
    const numeroElementos = schemas.length;
    
    return { 
      datos: schemas.slice(pagina*tamanyoPagina,pagina*tamanyoPagina+tamanyoPagina), 
      numeroElementos:numeroElementos
    }
    
  }

  private procesarSchemas(schemas: Array<ISchemaObjectWithKey>): Array<ISchemaObjectWithKey>{

    const schemasComoArray: Array<ISchemaObjectWithKey>=[];

    for (let schema of schemas) {
      schemasComoArray.push({key:schema.key, value: schema.value});
    }


    return schemasComoArray.sort( 
      function( a:ISchemaObjectWithKey , b:ISchemaObjectWithKey){
        if(a.key > b.key) return 1;
        if(a.key < b.key) return -1;
        return 0;
      }

    )


  }







}