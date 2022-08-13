import { IOperationObject, IParameterObject } from './../../../models/documentoOpenApi3';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arbol-operations',
  templateUrl: './arbol-operations.component.html',
  styleUrls: ['./arbol-operations.component.css']
})
export class ArbolOperationsComponent implements OnInit {

  @Input() operation: IOperationObject | undefined; 
  @Input() mostrarDescripcionesOperations=true;
  @Input() expandido: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  
  colorMetodo(metodo: string): {color:string, nombreMetodo:string} {

    switch(metodo) { 
      case "get": { 
         return {color:'#61affe', nombreMetodo:'GET'}
         break; 
      } 
      case "post": { 
        return {color:'#49cc90', nombreMetodo:'POST'}
        break; 
      } 
      case "patch": { 
        return {color:'#dfcaa6', nombreMetodo:'PATCH'}
        break; 
      } 
      case "delete": { 
        return {color:'#f93e3e', nombreMetodo:'DELETE'}
        break; 
      } 
      case "put": { 
        return {color:'#fca130', nombreMetodo:'PUT'}
        break; 
      } 
      default: { 
        return {color:'#61affe', nombreMetodo:'GET'}
        break; 
     } 
   } 
  }

  parametrosPath(): Array<IParameterObject> | undefined {



    let parameters: Array<IParameterObject> | undefined = undefined;
      this.operation.parameters?parameters=this.operation.parameters.filter(parameter => parameter.in === 'path'):undefined;
      return parameters;
  }

  parametrosQuery(): Array<IParameterObject> | undefined {


    return this.operation.parameters?this.operation.parameters.filter(parameter => parameter.in === 'query'):undefined;
}

}
