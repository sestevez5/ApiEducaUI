import { IOperationObject } from './../models/documentoOpenApi3';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EjecucionEndpointsService {



  constructor(http: HttpClient) { }

  ejecutarOperation(servidor: string, operation: IOperationObject) {





    

  }
}
