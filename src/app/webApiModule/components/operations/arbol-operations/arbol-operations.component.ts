import { IOperationObject } from './../../../models/documentoOpenApi3';
import { EnumMetodoHttp } from '../../../models/enumMetodoHttp';
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

  
  colorMetodo(metodo: EnumMetodoHttp): {color:string, nombreMetodo:string} {

    switch(metodo) { 
      case EnumMetodoHttp.GET: { 
         return {color:'#61affe', nombreMetodo:'GET'}
         break; 
      } 
      case EnumMetodoHttp.POST: { 
        return {color:'#49cc90', nombreMetodo:'POST'}
        break; 
      } 
      case EnumMetodoHttp.PATCH: { 
        return {color:'#dfcaa6', nombreMetodo:'PATCH'}
        break; 
      } 
      case EnumMetodoHttp.DELETE: { 
        return {color:'#f93e3e', nombreMetodo:'DELETE'}
        break; 
      } 
      case EnumMetodoHttp.PUT: { 
        return {color:'#fca130', nombreMetodo:'PUT'}
        break; 
      } 
   } 
  }

}
