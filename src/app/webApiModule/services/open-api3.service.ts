import { IComponentObject, IOpenApiObject3, ISchemaObject } from './../models/documentoOpenApi3';
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

    console.log('ruta: ',this.rutaDocumentoOpenApiActual);

    this.http.get(this.rutaDocumentoOpenApiActual)
      .subscribe(
        contenidoDocumentoActual => {

          const cda: any = contenidoDocumentoActual

          cda.components?this.obtenerComponentObject(cda.components):undefined

        
        


        }
      )

  }

  private obtenerComponentObject(components: any): IComponentObject|undefined {

    components.schemas?this.obtenerSchemaObject(components.schemas):undefined

    return undefined;

  }

  private obtenerSchemaObject(schemas: any): ISchemaObject[]|undefined {



    for (const key in schemas) {
      console.log(key);

      if ( schemas[key].$ref ) {
        console.log('Es un reference Object');
      }
      else
      {
        console.log('NO');
      }

      
    }
    return undefined;
  }

}