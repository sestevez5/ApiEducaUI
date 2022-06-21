import { IenumDto } from './../models/enumModel';
import { ICampo } from './../models/campoModel';
import { IDto } from './../models/dtoModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnumTipoDto } from '../models/enumTipoDto';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebapiService {

  uriDatos: string = '../assets/json/webapiPre.json';
  datos: any;

  dtos: IDto[]=[];

  constructor(private http: HttpClient) {
    //this.obtenerDtos();
  }

  obtenerDtos(): Observable<IDto[]> {

    let dtos: IDto[];

    return this.http.get(this.uriDatos)
    .pipe(
      map( datos => {

        this.datos = datos;

        let dtos: IDto[]=[];

        for(const [key, value] of Object.entries(datos)){
          if (key==='components') { 
            const nodoDtos = value.schemas;
            dtos = this.procesarDtos(nodoDtos);
    
            } // Fin if
        } // Fin for

        return dtos;
      })

    )
  }



procesarDtos(nodoDtos: any): IDto[]{

  const dtos: IDto[]=[];

  for(const [key, value] of Object.entries(nodoDtos)){

    console.log(key);
    
    const v: any =value;
    // Solo se analizan objetos de los schemas.
    if (v.properties) {
      const dto = this.obtenerDto(key,value);
      dtos.push(dto);
    }

  }
  return dtos;
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
        let nullable: undefined

        const val: any = value
   
        if (Object.prototype.hasOwnProperty.call(val, '$ref'))
        {
          tipoCampo=this.obtenerDtoAPartirDeReferencia(val['$ref']);
        }
        else if (Object.prototype.hasOwnProperty.call(val, 'type'))
        {
          tipoCampo = val['type'];        
        }


        if (Object.prototype.hasOwnProperty.call(val, 'nullable'))
        {
          nullable = val['nullable'];
        }

    

        const campo: ICampo = {
          nombreCampo: nombreCampo,
          tipoCampo: tipoCampo,
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


