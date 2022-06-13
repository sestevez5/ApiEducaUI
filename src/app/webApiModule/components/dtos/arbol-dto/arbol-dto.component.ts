import { IDto } from './../../../models/dtoModel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arbol-dto',
  templateUrl: './arbol-dto.component.html',
  styleUrls: ['./arbol-dto.component.css']
})
export class ArbolDTOComponent implements OnInit {

  IDto!: IDto

  @Input() dto: IDto | undefined; 
  @Input() ocultarTipos: boolean= false;
  @Input() esDtoRaiz: boolean = false;
  expandir = true;
  constructor() { }

  ngOnInit(): void {
  }

  esCampoSimple(tipoCampo: any) {

    return !(tipoCampo instanceof Object);
  }

 
  

}
