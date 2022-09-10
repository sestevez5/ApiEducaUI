import { BehaviorSubject, Observable } from "rxjs";

export class EjecucionOperation {
   
    datosEjecucion: IDatosEjecucionOperation;
    pathParametrizada: string;
    seccionQuery: string;
    parametrosQuery: Array<{nombre:string,valor:string}>;
    parametrosPath: Array<{nombre:string,valor:string}>;

    seccionesPath: Array<ISeccionPath>




    constructor(datosEjecucion: IDatosEjecucionOperation){
       this.ActualizarDatos(datosEjecucion);
    }
    
    
    public ActualizarDatos (datosEjecucion: IDatosEjecucionOperation) {
      this.datosEjecucion = datosEjecucion;
      this.pathParametrizada='';
      this.seccionQuery='';
      this.parametrosPath=[];
      this.parametrosQuery=[];
      this.seccionesPath=[];

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


      this.generarSeccionesPath();

      console.log(this.seccionesPath);

  

    }


    generarSeccionesPath(){

    let secciones: string[] = this.datosEjecucion.path.split('/');

    let seccionActual: ISeccionPath = {cadena:'', nombreParametro:'', valorParametro:''};

    secciones.filter(seccion => seccion.length>0).forEach(
      seccion => {

        seccionActual.cadena = seccion;

        if (seccion[0] !== '{') {

          seccionActual.nombreParametro ='',
          seccionActual.valorParametro = ''
      
        } else {

          seccionActual.nombreParametro = seccion.substring(1,seccion.length-1);
          seccionActual.valorParametro = ''


        }

  

        this.seccionesPath.push(seccionActual);
     
        
      }
    );

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

interface ISeccionPath {
  cadena:string;
  nombreParametro: string;
  valorParametro: string;

}