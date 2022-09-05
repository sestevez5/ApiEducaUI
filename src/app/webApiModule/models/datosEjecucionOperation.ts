export class EjecucionOperation {
   
    datosEjecucion: IDatosEjecucionOperation;
    pathConSustitucionParametros: string='';
    uriCompleta: string=''

    constructor(datosEjecucion: IDatosEjecucionOperation){
       this.ActualizarDatos(datosEjecucion);
    }
    
    
    public ActualizarDatos (datosEjecucion: IDatosEjecucionOperation) {
      this.datosEjecucion = datosEjecucion;

   

      const parametrosTipoPath: IValorParametroPath[] = this.datosEjecucion.parametros.filter( p => p.tipo === 'path');

      if ( parametrosTipoPath.length > 0 )
      {
        this.pathConSustitucionParametros = this.sustituirParametrosEnPath( datosEjecucion.path, datosEjecucion.parametros)
      } else {

          this.pathConSustitucionParametros = this.datosEjecucion.path

      }

      this.construirUriCompleta();

    }

  
    private sustituirParametrosEnPath(path: string, parametrosPath: Array<IValorParametroPath>): string {

        let pathConSustitucionParametros = path;
    
        parametrosPath.forEach(
          parametro => {
            if(parametro.valor) {
            const subcadena = '{'+parametro.nombre+'}';
            pathConSustitucionParametros = pathConSustitucionParametros.replace(subcadena, parametro.valor);
            }
          }
        )
    
        return pathConSustitucionParametros;
    
    }

    public construirUriCompleta() {
      let uri:string=this.pathConSustitucionParametros;

      this.datosEjecucion.parametros.filter(p => p.tipo === 'query').forEach(
        parametro => uri = uri + '?' + parametro.nombre + '=' + parametro.valor
        );

      this.uriCompleta = uri;

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

