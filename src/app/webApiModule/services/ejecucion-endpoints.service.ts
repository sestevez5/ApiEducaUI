import { Observable } from 'rxjs';
import { IDatosEjecucionOperation, IValorParametroPath } from './../models/datosEjecucionOperation';
import { IOperationObject } from './../models/documentoOpenApi3';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EjecucionEndpointsService {

  token: string;


  constructor(private http: HttpClient) { }


  ejecutarOperacionPost(uri: string, parametros: Object, tokenAutenticacion?: string, body?: string): Observable<Object> | undefined
  {


    let opcionesPeticion = new Object();

    opcionesPeticion['observe'] = 'response';


    // Paso 1: estableciendo cabecera de la petición
    if (tokenAutenticacion) {
      const headers = new HttpHeaders( {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenAutenticacion}`
      });

      opcionesPeticion['headers'] = headers;
    }



    // Estableciendo parámetros Query
    const httpParams = new HttpParams();
    if (parametros) {
      for (const key in parametros) {
        if (Object.prototype.hasOwnProperty.call(parametros, key)) {
  
         httpParams.append(key, parametros[key])
          
        }
      }

      opcionesPeticion['params'] = httpParams;

    }
   

 
    this.http.post(uri,body, opcionesPeticion).subscribe(
      datos =>  {
        console.log('petición completa',datos);
      }
    )

   return undefined;



    

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

  ejecutarOperation(datosEjecucion: IDatosEjecucionOperation ) {

    const parametrosTipoIn: IValorParametroPath[] = datosEjecucion.parametros.filter( p => p.tipo === 'in');

    if ( parametrosTipoIn.length > 0 )
    {
      datosEjecucion.path = this.sustituirParametrosEnPath( datosEjecucion.path, datosEjecucion.parametros)
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
