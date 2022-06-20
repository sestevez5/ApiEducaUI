import { IDto } from './../../../models/dtoModel';
import { Component, Input, OnInit } from '@angular/core';
import { __importDefault } from 'tslib';


@Component({
  selector: 'app-arbol-dto',
  templateUrl: './arbol-dto.component.html',
  styleUrls: ['./arbol-dto.component.css']
})
export class ArbolDTOComponent implements OnInit {

  enumTipologiaDeCampos = EnumTipologiaDeCampos;

  IDto!: IDto

  @Input() dto: IDto | undefined; 
  @Input() mostrarTiposDeCampos=true;
  @Input() mostrarDescripcionesDtos=true;
  @Input() esDtoRaiz: boolean = true;
  @Input() expandido: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  esCampoSimple(tipoCampo: any): EnumTipologiaDeCampos {
    if (tipoCampo instanceof Object) {
      console.log('tipoCampo:', tipoCampo);
    }
  
    if (!(tipoCampo instanceof Object)) return EnumTipologiaDeCampos.SIMPLE
    if ((tipoCampo instanceof Object) && tipoCampo.hasOwnProperty('enum')) return EnumTipologiaDeCampos.ENUMERADO
    else return EnumTipologiaDeCampos.DTO
  }

}

enum EnumTipologiaDeCampos {
  SIMPLE,
  ENUMERADO,
  DTO
}
