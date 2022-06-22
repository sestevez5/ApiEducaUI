import { IenumDto } from './../../../models/enumModel';
import { IDto } from './../../../models/dtoModel';
import { Component, Input, OnInit } from '@angular/core';
import { __importDefault } from 'tslib';
import { MatBadgeHarness } from '@angular/material/badge/testing'


@Component({
  selector: 'app-arbol-dto',
  templateUrl: './arbol-dto.component.html',
  styleUrls: ['./arbol-dto.component.css']
})
export class ArbolDTOComponent implements OnInit {

  enumTipologiaDeCampos = EnumTipologiaDeCampos;

  IDto!: IDto;
  IenumDto!: IenumDto;

  @Input() dto: IDto | undefined; 
  @Input() mostrarTiposDeCampos=true;
  @Input() mostrarDescripcionesDtos=true;
  @Input() esDtoRaiz: boolean = true;
  @Input() expandido: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  esCampoSimple(tipoCampo: any): EnumTipologiaDeCampos {

    if (!(tipoCampo instanceof Object)) return EnumTipologiaDeCampos.SIMPLE
    if ((tipoCampo instanceof Object) && tipoCampo.hasOwnProperty('valores')) return EnumTipologiaDeCampos.ENUMERADO
    else return EnumTipologiaDeCampos.DTO
  }

  convertirArrayCadenasEnCadena(cadenas: string[]): string {

    let cadena='';
    if (cadenas.length>0) { cadena = cadenas[0]}
    for (let index = 1; index < cadenas.length; index++) {
      cadena += ' | ' +cadenas[index];
      
    }

    return cadena;

  }

}

enum EnumTipologiaDeCampos {
  SIMPLE,
  ENUMERADO,
  DTO
}


