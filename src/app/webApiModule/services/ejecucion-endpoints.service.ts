import { Observable } from 'rxjs';
import { EjecucionOperation, IDatosEjecucionOperation, IValorParametroPath } from './../models/datosEjecucionOperation';
import { IOperationObject } from './../models/documentoOpenApi3';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EjecucionEndpointsService {




  constructor(private http: HttpClient) { }


  // ejecutarOperacionPost(): Observable<Object> | undefined
  // {


  //   let opcionesPeticion = new Object();

  //   opcionesPeticion['observe'] = 'response';


  //   // Paso 1: estableciendo cabecera de la petición
  //   if (tokenAutenticacion) {
  //     const headers = new HttpHeaders( {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${tokenAutenticacion}`
  //     });

  //     opcionesPeticion['headers'] = headers;
  //   }



  //   // Estableciendo parámetros Query
  //   const httpParams = new HttpParams();
  //   if (parametros) {
  //     for (const key in parametros) {
  //       if (Object.prototype.hasOwnProperty.call(parametros, key)) {
  
  //        httpParams.append(key, parametros[key])
          
  //       }
  //     }

  //     opcionesPeticion['params'] = httpParams;

  //   }
   

 
  //   this.http.post(uri,body, opcionesPeticion).subscribe(
  //     datos =>  {
  //       console.log('petición completa',datos);
  //     }
  //   )

  //  return undefined;



    

  // }

  ejecutarOperacionPost(ejecutionOperation: EjecucionOperation): Observable<Object> | undefined
  {


    let opcionesPeticion = new Object();

    opcionesPeticion['observe'] = 'response';

    // Obteniendo el token de autenticacion.
    const tokenAutenticacion: string =  ejecutionOperation.datosEjecucion.tokenAutentication;

    // Obteniendo los parámetros query
    const paramQuery: {nombre: string, valor: string}[] = ejecutionOperation.parametrosQuery;

    const uri: string = ejecutionOperation.pathParametrizada;

    const body: string = ejecutionOperation.datosEjecucion.body;


    console.log('token:', tokenAutenticacion);
    console.log('parámetrosQuery:', paramQuery);
    console.log('uri:', uri);
    console.log('body:', body);

    // Paso 1: estableciendo cabecera de la petición
    // if (datosEjecucion.tokenAutentication) {
    //   const headers = new HttpHeaders( {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${datosEjecucion.tokenAutentication}`
    //   });

    //   opcionesPeticion['headers'] = headers;
    // }



    // // Estableciendo parámetros Query
    // const httpParams = new HttpParams();
    // if (datosEjecucion.parametros.filter(p => )) {
    //   for (const key in parametros) {
    //     if (Object.prototype.hasOwnProperty.call(parametros, key)) {
  
    //      httpParams.append(key, parametros[key])
          
    //     }
    //   }

    //   opcionesPeticion['params'] = httpParams;

    // }
   

 
    // this.http.post(uri,body, opcionesPeticion).subscribe(
    //   datos =>  {
    //     console.log('petición completa',datos);
    //   }
    // )

   return undefined;



    

  }

  

  // ejecutarOperation2() {
  //   console.log('entrando')

  //   const endpoint:string = 'https://jsonplaceholder.typicode.com/todos/1';
    

  //   const headers = new HttpHeaders( {
  //     'Content-Type': 'application/json',
  //     // 'Authorization': `Bearer ${this.token}`
  //   });

  //   const requestOptions = { headers: headers, observe: 'response'};




  //   this.http.get<HttpResponse<string>>(endpoint, { observe: 'response'}).subscribe(
  //     datos =>  {
  //       console.log(JSON.stringify(datos.body));
       


  //     }
  //   )





    

  // }

  // ejecutarOperation3() {

  //   const endpoint:string = 'https://wwwpre.educacion.org/educacion/bussed/sigacapi/api/SituacionesAprendizaje/33E35926-9D86-435B-BC2E-02F4B45C1E92';
    

  //   const headers = new HttpHeaders( {
  //     'Content-Type': 'application/json',
  //     // 'Authorization': `Bearer ${this.token}`
  //   });

  //   const requestOptions = { headers: headers};




  //   this.http.get(endpoint, requestOptions).subscribe(
  //     datos =>  {
  //       console.log('datos:', JSON.stringify(datos));
       


  //     }
  //   )





    

  // }

  ejecutarOperation(ejecucionOperation: EjecucionOperation) {

    console.log(ejecucionOperation);
    switch (ejecucionOperation.datosEjecucion.metodo) {
      case 'post':
        this.ejecutarOperacionPost(ejecucionOperation)
        
        break;
    
      default:
        break;
    }
    

    
    
  }

  sustituirParametrosEnPath(path: string, parametrosIn: Array<IValorParametroPath>): string {

    let pathConSustitucionParametros = path;

    parametrosIn.forEach(
      parametro => {
        const subcadena = '{'+parametro.nombre+'}';
        pathConSustitucionParametros.replace(subcadena, parametro.valor);
      }
    )

    return pathConSustitucionParametros;

  }

  
}
