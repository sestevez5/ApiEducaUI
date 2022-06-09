import { EnumTipoDto } from './../../../models/enumTipoDto';
import { subsistemaModel } from './../../../models/subsistemaModel';
import { IDto } from './../../../models/dtoModel';
import { WebapiService } from './../../../services/webapi.service';
import { Component, Input, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

import { EnumTipoCampoSimple } from 'src/app/webApiModule/models/enumTipoCampoSimple';



const x: IDto = {
  denominacion: "Matricula",
  tipo: "MatriculaDTO",
  tipoDTO: EnumTipoDto.EX,
  subsistema: "Matriculas",
  campos: [
    { denominacion: "idMatricula", tipo: "numero", descripcion: "bla, bla"},
    { denominacion: "fecha", tipo: "cadena", descripcion: "bla, bla"},
    { denominacion: "viva", tipo: "fecha", descripcion: "bla, bla"},
    { denominacion: "area", tipo: "AreaDTO", tipoDTO: EnumTipoDto.EX, subsistema: "Matriculas", campos:[   { denominacion: "fecha", tipo: "cadena", descripcion: "bla, bla"},
    { denominacion: "viva", tipo: "cadena", descripcion: "bla, bla"},] }
  ]
}


@Component({
  selector: 'app-gestion-dtos',
  templateUrl: './gestion-dtos.component.html',
  styleUrls: ['./gestion-dtos.component.css']
})
export class GestionDtosComponent implements OnInit {


  @Input() dto:IDto = x;

  constructor(private was: WebapiService) { }



  ngOnInit(): void {
  }



}
