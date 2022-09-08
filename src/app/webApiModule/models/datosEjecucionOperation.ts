import { BehaviorSubject, Observable } from "rxjs";

export class EjecucionOperation {
   
    datosEjecucion: IDatosEjecucionOperation;
    pathParametrizada: string;
    seccionQuery: string;
    parametrosQuery: Array<{nombre:string,valor:string}>;
    parametrosPath: Array<{nombre:string,valor:string}>;




    constructor(datosEjecucion: IDatosEjecucionOperation){
       this.ActualizarDatos(datosEjecucion);
    }
    
    
    public ActualizarDatos (datosEjecucion: IDatosEjecucionOperation) {
      this.datosEjecucion = datosEjecucion;
      this.pathParametrizada='';
      this.seccionQuery='';
      this.parametrosPath=[];
      this.parametrosQuery=[];

      // Procesamiento de parámetros tipo path
      const parametrosTipoPath: IValorParametroPath[] = this.datosEjecucion.parametros.filter( p => p.tipo === 'path');

      if ( parametrosTipoPath.length > 0 )
      {
        this.pathParametrizada = this.sustituirParametrosEnPath( datosEjecucion.path, datosEjecucion.parametros)
      } else {

          this.pathParametrizada = this.datosEjecucion.path
      }

      // Procesamiento de parámetros tipo query
      this.generarSeccionQuery();

  

    }

  
    private sustituirParametrosEnPath(path: string, parametrosPath: Array<IValorParametroPath>): string {

        let pathParametrizada = path;
    
        parametrosPath.forEach(
          parametro => {
            if(parametro.valor) {
            const subcadena = '{'+parametro.nombre+'}';
            pathParametrizada = pathParametrizada.replace(subcadena, parametro.valor);

            this.parametrosPath.push({nombre:parametro.nombre, valor:parametro.valor})
            }
          }
        )
    
        return pathParametrizada;
    
    }

    public generarSeccionQuery() {
   

      const parametrosQuery = this.datosEjecucion.parametros.filter(p => p.tipo === 'query');
      
      if (parametrosQuery.length > 0) {
        let primero: boolean = true;
        parametrosQuery.forEach(
          parametro => {
            if (parametro.valor) {
              if (primero) {
                this.seccionQuery += '?';
                primero = !primero

              } else {
                this.seccionQuery += '&'
              }
              this.seccionQuery += parametro.nombre + '=' + parametro.valor;

              this.parametrosQuery.push({nombre:parametro.nombre, valor:parametro.valor})
            }
            
          }
          );

      }


    }

    public urlCompleta() {
      return this.datosEjecucion.servidor+this.pathParametrizada+this.seccionQuery;
    }




    
}



export interface IDatosEjecucionOperation {
    servidor: string;
    path: string;
    parametros: Array<IValorParametroPath>;
    tokenAutentication: string;
    body?: string;
}

export interface IValorParametroPath
{ tipo: string, nombre: string, valor: string }

