import { IRequestBody } from './../models/documentoOpenApi3';

import { ISchemaObjectWithKey } from "../models/documentoOpenApi3";


// export function colorMetodo(metodo: string): {color:string, nombreMetodo:string} {

//     switch(metodo) { 
//       case "get": { 
//          return {color:'#61affe', nombreMetodo:'GET'}
//          break; 
//       } 
//       case "post": { 
//         return {color:'#49cc90', nombreMetodo:'POST'}
//         break; 
//       } 
//       case "patch": { 
//         return {color:'#dfcaa6', nombreMetodo:'PATCH'}
//         break; 
//       } 
//       case "delete": { 
//         return {color:'#f93e3e', nombreMetodo:'DELETE'}
//         break; 
//       } 
//       case "put": { 
//         return {color:'#fca130', nombreMetodo:'PUT'}
//         break; 
//       } 
//       default: { 
//         return {color:'#61affe', nombreMetodo:'GET'}
//         break; 
//      } 
//    } 
//   }

export function propertyInSchema(schema: ISchemaObjectWithKey, propertyName): boolean{

   if ( schema.key === 'access_token') {
    console.log(schema.key);
    
    return true;
  } 

  if (schema.properties) {

    let result: boolean = false;

    schema.properties.forEach(
      property => {
        console.log(property.name);
        if (property.name === 'access_token') {
          result = true;
      
      
        } 

          if (propertyInSchema(property.value, propertyName)) {
            result = true;
            }

        
      }
    );


    if (result) {
    
      return true;
    } else {
      return false;

    }

    

  }

  return false;

}

export function ObtenerBodyRequestComoCadena( irb: IRequestBody, formateado: boolean=true): string {

  // el body siempre estará formado por un objeto y comenzará por '{'
  let cadena: string = '{'

  // En el caso de que haya (debe haber) propiedades en un schema, iteramos sobre el para obtener los campos
  if ( irb.content && irb.content.length>0 && irb.content[0].schema && irb.content[0].schema.properties) {
    const properties = irb.content[0].schema.properties;
    properties.forEach(
      property => {

        formateado? cadena += "\n\t": null;

         cadena += '"' + property.name + '":"'+property.value.type + '",';
       
      }
    );
    // En cada línea añadimos una "," al final. Debemos elimiar la última "," 
    properties.length>0?cadena = cadena.substring(0, cadena.length - 1):null;
 }

  // Finalmente añadimos el "}" para cerrar el objeto.
  formateado? cadena += "\n": null;
  cadena += "}";


  return cadena;
}

export function colorMetodo(metodo: string): {color:string, nombreMetodo:string, colorFondo:string, colorFondoClaro} {

    switch(metodo) { 
      case "get": { 
         return {color:'#61affe', nombreMetodo:'GET', colorFondo:'#ddeefe', colorFondoClaro:'#eff7fe'}
         break; 
      } 
      case "post": { 
        return {color:'#49cc90', nombreMetodo:'POST',colorFondo:'#d8f4e7', colorFondoClaro:'#ecf9f3'}
        break; 
      } 
      case "patch": { 
        return {color:'#dfcaa6', nombreMetodo:'PATCH',colorFondo:'#f8f3ec', colorFondoClaro:'#fbf9f6'}
        break; 
      } 
      case "delete": { 
        return {color:'#f93e3e', nombreMetodo:'DELETE',colorFondo:'#fdd6d6', colorFondoClaro:'#feebeb'}
        break; 
      } 
      case "put": { 
        return {color:'#fca130', nombreMetodo:'PUT',colorFondo:'#feebd3', colorFondoClaro:'#fef5ea'}
        break; 
      } 
      default: { 
        return {color:'#61affe', nombreMetodo:'GET',colorFondo:'#ddeefe', colorFondoClaro:'#eff7fe'}
        break; 
     } 
   } 
  }


export function textoTipo(tipoSchema:string):string {

    switch (tipoSchema) {
    case 'string':
        return 'Cadena de caracteres'
    break;

    case 'integer':
      return 'Entero'
    break;

    case 'number':
      return 'Decimal'
    break;

    case 'boolean':
      return 'Sí/No';
    break;

    
    case 'object':
      return 'Objeto';
    break;

    default:
      return tipoSchema;
    }
  }


  export function  textoFormato(formatoSchema:string):string {

    switch (formatoSchema) {
    case 'int32':
        return '32 bits';
    break;

    case 'int64':
      return '32 bits';
    break;

    case 'uuid':
      return 'Guid'
    break;

    case 'date-time':
      return 'Fecha/hora';
    break;

    case 'date':
      return 'Fecha';
    break;


    default:
      return formatoSchema;
    }
  }

