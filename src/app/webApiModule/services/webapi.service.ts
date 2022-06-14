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

  dtos: IDto[]=[];

  constructor(private http: HttpClient) {
    //this.obtenerDtos();
  }

  obtenerDtos(): Observable<IDto[]> {

    let dtos: IDto[];

    return this.http.get(this.uriDatos)
    .pipe(
      map( datos => {

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

    if (key.endsWith('EXDTO') || key.endsWith('InfoDTO')){

      const dto = this.obtenerDto(key,value);
      dtos.push(dto);

       
    }
  }

 

  return dtos;

}


obtenerDto(key:any, value: any): IDto{

  const arrayNombresDto=key.split('.');
  const longitud = arrayNombresDto.length;



  const dto:IDto = {
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
        console.log(nombreCampo);
        let tipo=''
        let nullable: undefined

        const val: any = value
   
        if (Object.prototype.hasOwnProperty.call(val, 'type'))
        {
          tipo = val['type'];
          console.log('tipo',tipo);

        }
        if (Object.prototype.hasOwnProperty.call(val, 'nullable'))
        {
          nullable = val['nullable'];
        }

        if (Object.prototype.hasOwnProperty.call(val, '$ref'))
        {
          console.log(val['$ref'])

        }

        const campo: ICampo = {
          nombreCampo: nombreCampo,
          tipoCampo: tipo,
          nullable: nullable
        }

        campos.push(campo);
        
    
}

  return campos;

}
// ObtenerDtos(paths:Object){

//   let endPoints: string[][]=[];

//   for(const [key, value] of Object.entries(paths)){

//     const arrayNombresDto=key.split('.');
//     const longitud = arrayNombresDto.length;

//     const nombreDto = arrayNombresDto[longitud-1];
   
//     if (nombreDto.endsWith('ExDTO')){
//       endPoints.push(arrayNombresDto)
//     }
    
//     console.log(endPoints);
    
// }
  

// }

// procesarEndpoint(key: string){

//   const arrayNombresDto=key.split('.');
//   const longitud = arrayNombresDto.length;
//   for (let index = 0; index < array.length; index++) {
//   const element = array[index];
  
// }

//   console.log(arrayNombresDto);
//   console.log('Dto: ', arrayNombresDto[longitud-1])

// }


//ProcesarDtos1(){
  //   this.http.get(this.uriDatos).subscribe(dato=> {
  
      
  //     for(const [key, value] of Object.entries(dato)){
  //           if (key==='components') { 
  //             const x=value.schemas;
  //             for(const [key, value] of Object.entries(x)){
          
  //                 this.ObtenerDtos(x);
                 
  //         }
  //            }
  //     }
  //   });
  // }
  

}
