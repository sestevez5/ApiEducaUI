import { IenumDto } from './../models/enumModel';
import { ICampo } from './../models/campoModel';
import { IDto } from './../models/dtoModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnumTipoDto } from '../models/enumTipoDto';
import { map, Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WebapiService {

  origenDatosOpenApiOnline: string = '../assets/datas/origenesDatosOpenApi.json';

  rutasDatosOpenApiOnline$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);



 

  uriDatos$: BehaviorSubject<string>= new BehaviorSubject<string>("");
  dtos$: BehaviorSubject<IDto[]> = new BehaviorSubject<IDto[]>([]);

  uriDatosOriginal: string = '../assets/json/webapiPre.json';
  uriDatosActual: string = '';
  contenidoDocumentoActual: any;


  dtosActuales: IDto[];  // mantiene los últios dtos cargados.
 

  constructor(private http: HttpClient) {

    // Acción cuando se emite un nuevo documento openApi
    this.uriDatos$
    .subscribe(
      nuevoDoc => {
        this.uriDatosActual = nuevoDoc; //Establecemos el nuevo documento como actual
        this.uriDatosActual != ""?this.actualizarDtos():null; // Actualizamos la lista de Dtos
      }
    );

    // Acción cambia se emite una nueva colección de Dtos.
    this.dtos$
    .subscribe(
      nuevosDtos => {this.dtosActuales = nuevosDtos; }
      
    )

    // Emitimos, por defecto, un documento que desencadenará contenidoDocumentoActual.
    //this.uriDatos$.next('../assets/json/webapiPre.json');

    this.http.get(this.origenDatosOpenApiOnline)
    .subscribe(
      contenidoDocumentoActual => {
    
        const coleccionRutas: any[]=[]
        for(const [key, value] of Object.entries(contenidoDocumentoActual["rutas"])){
  
          coleccionRutas.push(value);
        
        } // Fin for
        this.rutasDatosOpenApiOnline$.next(coleccionRutas);
        
  
        this.uriDatos$.next(this.rutasDatosOpenApiOnline$.value[0].url);
  
      }


  
    )


   
    
  }

  obtenerRutasDocumentosOpenApi(): BehaviorSubject<any[]> {
    return this.rutasDatosOpenApiOnline$;
  }

  // Se establece un nuevo documento openApi. Desencadenará la regeneración de todo el documento.
  cambiarDocumento(nuevoDoc: string) {
    this.uriDatos$.next(nuevoDoc);
  }

  // Se devuelve un subconjunto de dtos a partir de los datos pasados como parámetros.
  obtenerDtos(cadenaFiltro:string, pagina: number, tamanyoPagina:number): {datos:IDto[], numeroElementos:number} {



    const dtos = cadenaFiltro?this.dtosActuales.filter(dto => dto.nombreDto.toLowerCase().includes(cadenaFiltro.toLowerCase())):this.dtosActuales;
    const numeroElementos = dtos.length;
    
    return { 
      datos: dtos.slice(pagina*tamanyoPagina,pagina*tamanyoPagina+tamanyoPagina), 
      numeroElementos:numeroElementos
    }
  }

  //--------------------------------------
  // Métodos privados
  //--------------------------------------

  // A partir del documento establecido en this.uriDatosActual regenera la lista de dtos 
  // ( emite un nuevo valor que es procesado por la subscripción de dtos$ )
  private actualizarDtos(){


    
    this.http.get(this.uriDatosActual)
    .pipe(
      map(

        


        contenidoDocumentoActual => {

       

        let dtos: IDto[];
     


          this.contenidoDocumentoActual=contenidoDocumentoActual;
   
          for(const [key, value] of Object.entries(contenidoDocumentoActual)){
            if (key==='components') { 
              const nodoDtos = (<any>value).schemas;
          
              dtos = this.procesarDtos(nodoDtos);

          
            
            } // Fin if
          } // Fin for

          this.dtos$.next(dtos);
        })
    ).subscribe();

   
    }

  // Itera sobre el documento OpenApi para obtener la colección de IDtos
  private procesarDtos(nodoDtos: any): IDto[]{

    const dtos: IDto[]=[];

    for(const [key, value] of Object.entries(nodoDtos)){

      
      
      const v: any =value;
      // Solo se analizan objetos de los schemas.
      if (v.properties) {
        const dto = this.obtenerDto(key,value);
        dtos.push(dto);
      }

    }
    return dtos.sort(
    
        function( a:IDto , b:IDto){
          if(a.nombreDto > b.nombreDto) return 1;
          if(a.nombreDto < b.nombreDto) return -1;
          return 0;
        }

    );
  }

  // A partir de un nodo del documento obtiene el Dto correspondiente
  private obtenerDto(key:any, value: any): IDto {

    const arrayNombresDto=key.split('.');
    const longitud = arrayNombresDto.length;

    let dto:IDto;
      dto = {
        nombreDto: arrayNombresDto[longitud-1],
        tipoDto: EnumTipoDto.EX,
        subsistema: arrayNombresDto[longitud-2],
        gestion: arrayNombresDto[longitud-3],
        campos: this.obtenerCamposDto(value.properties)
      };
    



    return dto;

  }

  private obtenerCamposDto(camposNodo: any):ICampo[] {

      const campos:ICampo[]=[];

      for(const [key, value] of Object.entries(camposNodo)){

      
          const nombreCampo=key;

          let tipoCampo: any;
          let esColeccion: boolean=false;
          let nullable: undefined

          const val: any = value
    
          if (Object.prototype.hasOwnProperty.call(val, '$ref'))
          {
            tipoCampo=this.obtenerDtoAPartirDeReferencia(val['$ref']);
          }
          else if (Object.prototype.hasOwnProperty.call(val, 'type'))
          {
        
            if (val.type==='array'){
            
              esColeccion=true;
              if (Object.prototype.hasOwnProperty.call(val.items, '$ref')){
                tipoCampo=this.obtenerDtoAPartirDeReferencia(val.items['$ref']);
              } else
              {
                tipoCampo = val.items['type']; 
              }
            } else {
              tipoCampo = val['type']; 

            }
          

          }


          if (Object.prototype.hasOwnProperty.call(val, 'nullable'))
          {
            nullable = val['nullable'];
          }

      

          const campo: ICampo = {
            nombreCampo: nombreCampo,
            tipoCampo: tipoCampo,
            esColeccion: esColeccion,
            nullable: nullable
          }

          campos.push(campo);
          
      
  }

    return campos;

  }

  private obtenerDtoAPartirDeReferencia(referencia:string): IDto | IenumDto{

  
    const arraySeccionesReferencia=referencia.split('/');
    const key = arraySeccionesReferencia[arraySeccionesReferencia.length-1]
    const value = this.contenidoDocumentoActual.components.schemas[arraySeccionesReferencia[arraySeccionesReferencia.length-1]]

    if (value.enum) {
      
      return { "valores": value.enum, "tipo": "string"}
      
    }
    else {
    const dto: IDto = this.obtenerDto(key, value);
    return dto;
    }
    


  };

}


