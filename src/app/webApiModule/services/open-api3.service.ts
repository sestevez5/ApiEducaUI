import { IComponentObject, IOpenApiObject3, ISchemaReferenceObject, ISchemaObject, IReferenceObject } from './../models/documentoOpenApi3';
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
  rutaDocumentoOpenApiActual$: BehaviorSubject<string>= new BehaviorSubject<string>("");
  

  // Contiene el objeto global que representa al documento openApi3
  OpenApiObject3Actual: IOpenApiObject3;
  OpenApiObject3Actual$: BehaviorSubject<IOpenApiObject3|undefined> = new BehaviorSubject<IOpenApiObject3|undefined>(undefined);


  

  constructor(private http: HttpClient) {

    // this.rutaDocumentoOpenApiActual$
    //   .subscribe(
    //     nuevoDocumentoOpenApi3 => {
    //       this.rutaDocumentoOpenApiActual = nuevoDocumentoOpenApi3;
    //       this.rutaDocumentoOpenApiActual != ""?this.actualizarOpenApiObject3Actual():null;
    //     }
    //   )



   }



  obtenerRutasPreestablecidasDocumentosOpenApi3(): BehaviorSubject<any[]> {
    return this.rutasPreestablecidasDocumentosOpenApi3$;
  }


  actualizarOpenApiObject3Actual() {



    this.http.get(this.rutaDocumentoOpenApiActual)
      .subscribe(
        contenidoDocumentoActual => {

          const cda: any = contenidoDocumentoActual

          cda.components?this.obtenerComponentObject(cda.components):undefined;
          console.log(cda);

        }
      )

  }

  private obtenerComponentObject(components: any): IComponentObject|undefined {

    components.schemas?this.obtenerSchemaReferenceObject(components.schemas):undefined

    return undefined;

  }

  private obtenerSchemaReferenceObject(schemas: any): ISchemaReferenceObject[]|undefined {

    const schemasReferenceObject: ISchemaReferenceObject[]=[];

    let name: string;
    let structure: ISchemaObject | IReferenceObject


    for (const key in schemas) {

      name=key;
  
    

      if ( schemas[key].$ref ) {
        
        structure = {
          reference: schemas[key].$ref
        }
          
      }
      else
      {
       
        structure =  this.obtenerSchemaObject(schemas[key]);
      }

      schemasReferenceObject.push({
        name: name,
        structure: structure
      });

    

    }

    
    return undefined;
  }

  private obtenerSchemaObject(schema:any): ISchemaObject | undefined {

    let schemaObject: ISchemaObject = {
      type: schema.type?schema.type:null,
      properties: schema.properties?this.obtenerSchemaReferenceObject(schema.properties):null,
      format: schema.format?schema.format:null,
      nullable: schema.nullable?schema.nullable:null,
      description: schema.description?schema.description:null,

    }

    //console.log("schemaObjerct", schemaObject);

    return schemaObject;

    


  }




}