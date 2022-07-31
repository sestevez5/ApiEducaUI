import { ISchemaObject, ISchemaObjectWithKey } from './../../../models/documentoOpenApi3';
import { IenumDto } from './../../../models/enumModel';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-arbol-schemas',
  templateUrl: './arbol-schemas.component.html',
  styleUrls: ['./arbol-schemas.component.css']
})
export class ArbolSchemasComponent {

  enumTipologiaDePropiedades = EnumTipologiaDePropiedades;

  ISchemaObjectWithKey!: ISchemaObjectWithKey
  IenumDto!: IenumDto;


  @Input() schema: ISchemaObjectWithKey | undefined; 
  @Input() mostrarTiposDePropiedades=true;
  @Input() mostrarDescripcionesSchemas=true;
  @Input() esSchemaRaiz: boolean = true;
  @Input() expandido: boolean = false;

  constructor() { }

  tipoPropiedad(tipoPropiedad: string): EnumTipologiaDePropiedades {

    if (tipoPropiedad != 'object' && tipoPropiedad != 'array') return EnumTipologiaDePropiedades.SIMPLE
    //if ((tipoCampo instanceof Object) && tipoCampo.hasOwnProperty('valores')) return EnumTipologiaDePropiedades.ENUMERADO
    else return EnumTipologiaDePropiedades.SCHEMA
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

enum EnumTipologiaDePropiedades {
  SIMPLE,
  ENUMERADO,
  SCHEMA
}
