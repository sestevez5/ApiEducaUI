import { WebapiService } from './../../../services/webapi.service';

import { IDto } from '../../../models/dtoModel';

import { Component, Input, OnInit } from '@angular/core';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pageWebApi',
  templateUrl: './pageWebApi.component.html',
  styleUrls: ['./pageWebApi.component.css']
})
export class PageWebApiComponent {

  constructor(was: WebapiService){
    was.obtenerDocumentos()
  }

  documentosOpenApiPrefijados: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  selectedFood = this.documentosOpenApiPrefijados[2].value;

  selectCar(event: Event) {
    this.selectedFood = (event.target as HTMLSelectElement).value;
  }
}
