import { EnumMetodoHttp } from './../../../models/enumMetodoHttp';
import { IEndpoint } from './../../../models/endpointModel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.css']
})
export class EndpointComponent implements OnInit {


  @Input() endpoint: IEndpoint | undefined; 
  @Input() mostrarDescripcionesDtos=true;
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
