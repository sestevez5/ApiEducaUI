import { ICampoSimple } from './../../../models/campoSimpleModel';
import { IDto } from './../../../models/dtoModel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arbol-dto',
  templateUrl: './arbol-dto.component.html',
  styleUrls: ['./arbol-dto.component.css']
})
export class ArbolDTOComponent implements OnInit {

  ICampoSimple!: ICampoSimple;
  IDto!: IDto

  @Input() dto: IDto | undefined; 
  @Input() nombreCampo: string | undefined;
  @Input() ocultarTipos: boolean= true;
  constructor() { }

  ngOnInit(): void {
  }

  esCampoSimple(campo: IDto|ICampoSimple) {
    return !('tipoDTO' in campo);
  }

  

}
