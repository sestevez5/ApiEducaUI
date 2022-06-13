import { IDto } from './../models/dtoModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebapiService {

  uriDatos: string = '../assets/json/webapiPre.json';

  dtos: IDto[]=[];

  constructor(private http: HttpClient) {

    //this.ProcesarDtos();

}

ProcesarDtos(){
  this.http.get(this.uriDatos).subscribe(dato=> {

    
    for(const [key, value] of Object.entries(dato)){
          if (key==='components') { 
            const x=value.schemas;
            for(const [key, value] of Object.entries(x)){
        
                this.ObtenerDtos(x);
               
        }
           }
    }
  });
}

ObtenerDtos(paths:Object){

  let endPoints: string[][]=[];

  for(const [key, value] of Object.entries(paths)){

    const arrayNombresDto=key.split('.');
    const longitud = arrayNombresDto.length;

    const nombreDto = arrayNombresDto[longitud-1];
   
    if (nombreDto.endsWith('ExDTO')){
      endPoints.push(arrayNombresDto)
    }
    
    console.log(endPoints);
    
}
  

}

// procesarEndpoint(key: string){

//   const arrayNombresDto=key.split('.');
//   const longitud = arrayNombresDto.length;
//   for (let index = 0; index < array.length; index++) {
//   const element = array[index];
  
// }

//   console.log(arrayNombresDto);
//   console.log('Dto: ', arrayNombresDto[longitud-1])

// }


}
