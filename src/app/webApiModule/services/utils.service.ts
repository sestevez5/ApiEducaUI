import { Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
  export class UtilsService {

    
  colorMetodo(metodo: string): {color:string, nombreMetodo:string, colorFondo:string, colorFondoClaro} {

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



  }