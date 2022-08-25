import { IOperationObject } from './../models/documentoOpenApi3';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EjecucionEndpointsService {

  token: string;


  constructor(private http: HttpClient) { }

  // ejecutarOperation(servidor: string, operation: IOperationObject)
  ejecutarOperation1() {

    const endpoint:string = 'https://wwwpre.educacion.org/educacion/bussed/sigacapi/api/Auth/autenticacionPorCredenciales';
    let auth_token = "asjdhkjsdhjk";

    const headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const requestOptions = { headers: headers};

    const body = { "username": "43361250V"};


    this.http.post(endpoint,body, {observe: 'response'}).subscribe(
      datos =>  {
        console.log('petición completa',datos);
        console.log()
     
        this.token = datos['access_token'];
        // this.ejecutarOperation2();


      }
    )





    

  }

  ejecutarOperation2() {
    console.log('entrando')

    const endpoint:string = 'https://jsonplaceholder.typicode.com/todos/1';
    

    const headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const requestOptions = { headers: headers, observe: 'response'};




    this.http.get<HttpResponse<string>>(endpoint, { observe: 'response'}).subscribe(
      datos =>  {
        console.log(JSON.stringify(datos.body));
       


      }
    )





    

  }

  ejecutarOperation3() {

    const endpoint:string = 'https://wwwpre.educacion.org/educacion/bussed/sigacapi/api/SituacionesAprendizaje/33E35926-9D86-435B-BC2E-02F4B45C1E92';
    

    const headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const requestOptions = { headers: headers};




    this.http.get(endpoint, requestOptions).subscribe(
      datos =>  {
        console.log('datos:', JSON.stringify(datos));
       


      }
    )





    

  }
}
