import { WebapiService } from './../../../services/webapi.service';

import { IDto } from '../../../models/dtoModel';

import { Component, Input, OnInit } from '@angular/core';


interface OrigenDatosOpenApi {
  orden: number;
  url: string;
  descripcion: string;
}

@Component({
  selector: 'app-pageWebApi',
  templateUrl: './pageWebApi.component.html',
  styleUrls: ['./pageWebApi.component.css']
})
export class PageWebApiComponent {

  documentosOpenApiPrefijados: OrigenDatosOpenApi[]=[];

  constructor(private was: WebapiService){

    was.obtenerRutasDocumentosOpenApi().subscribe(
      rutas => {
        this.documentosOpenApiPrefijados=rutas;
        console.log(this.documentosOpenApiPrefijados);
      }
    )
  }


 

  selectedFood: string = null;

  selectCar(event: Event) {
    this.selectedFood = (event.target as HTMLSelectElement).value;
  }
}
