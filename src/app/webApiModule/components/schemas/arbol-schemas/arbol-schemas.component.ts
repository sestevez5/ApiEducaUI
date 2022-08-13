import { ISchemaObject, ISchemaObjectWithKey } from './../../../models/documentoOpenApi3';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-arbol-schemas',
  templateUrl: './arbol-schemas.component.html',
  styleUrls: ['./arbol-schemas.component.css']
})
export class ArbolSchemasComponent {

  enumTipologiaDePropiedades = EnumTipologiaDePropiedades;

  ISchemaObjectWithKey!: ISchemaObjectWithKey



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

  
admiteNulo(): string {
 return (this.schema.nullable && this.schema.nullable === true)?"Admite nulo":"No admite nulo";
} 

tienePropiedades(): boolean {
  return (this.schema.properties && this.schema.properties.length > 0)?true:false;
}


colorAtributoSchema(atributoSchema: string): string {

  switch(atributoSchema) { 
    case "tipo": { 
       return '#ededaf';
       break; 
    } 
    case "formato": { 
      return '#ffb6af';
      break; 
    } 
    case "admiteNulo": { 
      return '#dfcaa6';
      break; 
    } 
    
    default: { 
      return '#61affe';
      break; 
   } 
 } 
}

}

enum EnumTipologiaDePropiedades {
  SIMPLE,
  ENUMERADO,
  SCHEMA
}
                        
