import { ICampoSimple } from './../../../models/campoSimpleModel';
import { IDto } from './../../../models/dtoModel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arbol-agrupamientos',
  templateUrl: './arbol-agrupamientos.component.html',
  styleUrls: ['./arbol-agrupamientos.component.css']
})
export class ArbolAgrupamientosComponent implements OnInit {

  ICampoSimple!: ICampoSimple;
  IDto!: IDto
  @Input() dto: IDto | undefined; 
  @Input() nombreCampo: string | undefined;
  @Input() ocultarTipos: boolean= false;
  @Input() esDtoRaiz: boolean = false;
  expandir = true;
  constructor() { }

  ngOnInit(): void {
  }

  esCampoSimple(campo: IDto|ICampoSimple) {
    return !('tipoDTO' in campo);
  }


}
