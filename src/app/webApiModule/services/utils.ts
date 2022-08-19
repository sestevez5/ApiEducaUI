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

