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

    this.ProcesarDatos();

}

ProcesarDatos(){
  this.http.get(this.uriDatos).subscribe(dato=> {
    
    for(const [key, value] of Object.entries(dato)){
          if (key==='paths') { 
            this.ObtenerDtos(value);
           }
    }
  });
}

ObtenerDtos(paths:Object){

  for(const [key, value] of Object.entries(paths)){
 
      console.log(key,value);
    
}
  

}


}
