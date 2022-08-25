
import { ISchemaObjectWithKey } from "../models/documentoOpenApi3";

export function colorMetodo(metodo: string): {color:string, nombreMetodo:string} {

    switch(metodo) { 
      case "get": { 
         return {color:'#61affe', nombreMetodo:'GET'}
         break; 
      } 
      case "post": { 
        return {color:'#49cc90', nombreMetodo:'POST'}
        break; 
      } 
      case "patch": { 
        return {color:'#dfcaa6', nombreMetodo:'PATCH'}
        break; 
      } 
      case "delete": { 
        return {color:'#f93e3e', nombreMetodo:'DELETE'}
        break; 
      } 
      case "put": { 
        return {color:'#fca130', nombreMetodo:'PUT'}
        break; 
      } 
      default: { 
        return {color:'#61affe', nombreMetodo:'GET'}
        break; 
     } 
   } 
  }

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

