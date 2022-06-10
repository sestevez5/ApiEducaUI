import { EnumTipoDto } from '../../../models/enumTipoDto';
import { subsistemaModel } from '../../../models/subsistemaModel';
import { IDto } from '../../../models/dtoModel';
import { WebapiService } from '../../../services/webapi.service';
import { Component, Input, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

import { EnumTipoCampoSimple } from 'src/app/webApiModule/models/enumTipoCampoSimple';



const x: IDto[] = [{
  denominacion: "Matricula",
  tipo: "MatriculaDTO",
  tipoDTO: EnumTipoDto.EX,
  subsistema: "Matriculas",
  gestion: "Prueba",
  campos: [
    { denominacion: "idMatricula", tipo: "numero", descripcion: "bla, bla"},
    { denominacion: "fecha", tipo: "cadena", descripcion: "bla, bla"},
    { denominacion: "viva", tipo: "fecha", descripcion: "bla, bla"},
    { denominacion: "area", tipo: "AreaDTO", tipoDTO: EnumTipoDto.EX, subsistema: "Matriculas", gestion: "pruebaGestion", campos:[   { denominacion: "fecha", tipo: "cadena", descripcion: "bla, bla"},
    { denominacion: "viva", tipo: "cadena", descripcion: "bla, bla"},] }
  ]
},
{
  denominacion: "Matricula",
  tipo: "MatriculaDTO",
  tipoDTO: EnumTipoDto.EX,
  subsistema: "Matriculas",
  gestion: "pruebaGestion",
  campos: [
    { denominacion: "idMatricula", tipo: "numero", descripcion: "bla, bla"},
    { denominacion: "fecha", tipo: "cadena", descripcion: "bla, bla"},
    { denominacion: "viva", tipo: "fecha", descripcion: "bla, bla"},
    { denominacion: "area", tipo: "AreaDTO", tipoDTO: EnumTipoDto.EX, subsistema: "Matriculas", gestion: "pruebaGestion", campos:[   { denominacion: "fecha", tipo: "cadena", descripcion: "bla, bla"},
    { denominacion: "viva", tipo: "cadena", descripcion: "bla, bla"},] }
  ]
}



]


@Component({
  selector: 'app-pageDtos',
  templateUrl: './pageDtos.component.html',
  styleUrls: ['./pageDtos.component.css']
})
export class PageDtosComponent implements OnInit {


  @Input() dtos:IDto[] = x;
  
  events: string[] = [];
  opened= false;
  constructor(private was: WebapiService) { }



  ngOnInit(): void {
  }

  log(state:any){
    console.log(state)
  }



}
