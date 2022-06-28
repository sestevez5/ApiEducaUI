import { IenumDto } from './../models/enumModel';
import { ICampo } from './../models/campoModel';
import { IDto } from './../models/dtoModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnumTipoDto } from '../models/enumTipoDto';
import { map, Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebapiService {

  origenDatosOpenApiOnline: any = '../assets/datas/origenesDatosOpenApi.json';

  urisDatosOpenApiOnline: string[];



  origenDatosSeleccionado =   this.http.get(this.origenDatosOpenApiOnline)
  .subscribe(
    datos => {
      const coleccionUrls: string[]=[]
      for(const [key, value] of Object.entries(datos)){

        coleccionUrls.push(value.url);
      
      } // Fin for

    }

  )
  uriDatos: string = '../assets/json/webapiPre.json';
  datos: any;

  dtos: BehaviorSubject<IDto[]> = new BehaviorSubject<IDto[]>([]);


  

  constructor(private http: HttpClient) {



  }

  obtenerDtos() {
    

  this.http.get<IDto[]>(this.uriDatos)
  .subscribe(
      datos => {
        this.datos = datos;
        for(const [key, value] of Object.entries(datos)){
          if (key==='components') { 
            const nodoDtos = (<any>value).schemas;
            const dtos = this.procesarDtos(nodoDtos).slice(0,1720);
            this.dtos.next(dtos);
          } // Fin if
        } // Fin for
      }
    )
  }



procesarDtos(nodoDtos: any): IDto[]{

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


obtenerDto(key:any, value: any): IDto{

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


obtenerCamposDto(camposNodo: any):ICampo[]{


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


obtenerDtoAPartirDeReferencia(referencia:string): IDto | IenumDto{

  const arraySeccionesReferencia=referencia.split('/');
  const key = arraySeccionesReferencia[arraySeccionesReferencia.length-1]
  const value = this.datos.components.schemas[arraySeccionesReferencia[arraySeccionesReferencia.length-1]]

  if (value.enum) {
    
    return { "valores": value.enum, "tipo": "string"}
    
  }
  else {
  const dto: IDto = this.obtenerDto(key, value);
  return dto;
  }
  


};

}


