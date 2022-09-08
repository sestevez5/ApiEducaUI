import { EjecucionEndpointsService } from './../../../services/ejecucion-endpoints.service';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { IValorParametroPath, EjecucionOperation } from './../../../models/datosEjecucionOperation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenApi3Service } from './../../../services/open-api3.service';
import { IOpenApiObject3, IOperationObject, IParameterObject } from './../../../models/documentoOpenApi3';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { colorMetodo, ObtenerBodyRequestComoCadena } from '../../../services/utils'


interface parametroFormControl {
  nombre: string;
  valor: Array<any>;
}
@Component({
  selector: 'app-panel-execute-operation',
  templateUrl: './panel-execute-operation.component.html',
  styleUrls: ['./panel-execute-operation.component.css']
})
export class PanelExecuteOperationComponent {

  //------------------------------------------------------------------
  // ESTABLECIMIENTO DE PARÁMETROS
  //------------------------------------------------------------------
  ejecutandoOperacion = false;
  formParametros: FormGroup;  // Objeto de establecimiento de campos relativos a parámetros.
  tieneParametros: boolean;  

  formBody: FormGroup;  // Objeto de establecimiento del campo "Body"
  tieneBody: boolean;
  
  // Objeto que encapsula todos los datos necesarios para la ejecución de una operación
  ejecucionOperation: EjecucionOperation; 
  
  // Observable que contiene la información actualizada del valor de los parámetros.
  valorParametros$: BehaviorSubject<Array<IValorParametroPath>> = new BehaviorSubject([])
  valorBody$: BehaviorSubject<string> = new BehaviorSubject('');

 

  //------------------------------------------------------------------
  // CONSTRUCTOR
  //------------------------------------------------------------------
  constructor(
    public dialogRef: MatDialogRef<PanelExecuteOperationComponent >,
    @Inject(MAT_DIALOG_DATA) public data: IOperationObject,
    private oa3: OpenApi3Service,
    private eep: EjecucionEndpointsService,
    private fb: FormBuilder
  ) { 

    // Iniciando datos de parámetros.
    this.tieneParametros = data.parameters?true:false;
    this.tieneParametros?this.iniciarParametros():null;
  
    // Iniciando datos del "body" ( En el caso de que haya )
    this.tieneBody = data.requestBody?true:false;
    this.tieneBody?this.iniciarBody():null;


    
    // estableciendo valores iniciales de la ejecución
    this.ejecucionOperation = new EjecucionOperation(
      {
        servidor: this.servidorActual(),
        path: data.path,
        parametros: this.tieneParametros?this.obtenerValoresParametros():[],
        tokenAutentication: oa3.tokenActual,
        body: this.tieneBody?this.formBody.controls['body'].value:null      
      }
    );


    // Los datos de ejecución de una operación dependen del servidor, el token de autenticación
    // del valor de los parámetros, del body y del Path. Cada vez que alguno de estos datos cambien se debe
    // reflejar en el objeto ejecuciónOperation. 
    // Para ello se ha creado un observable que emite valores ante el cambio del servidor, del token 
    // o de alguno de los parámetros.
    combineLatest(
      [
        oa3.serverActual$,
        oa3.tokenActual$,
        this.valorParametros$,
        this.valorBody$
      ]
    )
    .pipe(
      map( combinacion => {
        return {
          servidorActual: combinacion[0],
          tokenActual: combinacion[1],
          valorParametrosActuales: combinacion[2],
          valorBodyActual: combinacion[3]
        }
        
      })
    ).subscribe(
      combinacion => {

        this.ejecucionOperation.ActualizarDatos({
          
            servidor: combinacion.servidorActual.url,
            path: data.path, // Siempre es el mismo valor. 
            parametros: combinacion.valorParametrosActuales,
            tokenAutentication: combinacion.tokenActual,
            body: combinacion.valorBodyActual      
          
        });
  

      }
    )
  

  }



  onCerrar(): void {
    this.dialogRef.close();
  }

  //------------------------------------------------------------------
  // MÉTODOS AUXILARES
  //------------------------------------------------------------------
  obtenerColorMetodo(metodoHttp: string): {color: string, nombreMetodo: string} {
    return colorMetodo(metodoHttp)
  }

  servidorActual():string {
    return this.oa3.serverActual.url;
  }

  iniciarParametros() {

    let parametrosFormControl: Object = new Object();

    this.data.parameters.forEach(
      parameter => {
        const valor: Array<any> = ['']; // Inicialmente solo tiene el valor inicial que siempre será la cadena vacía
        valor.push(this.obtenerRestricciones(parameter))
        parametrosFormControl[parameter.name] = valor;
      }
    );

    // pasamos el objeto de arrays construdio al formulario reactivo.
    this.formParametros = this.fb.group(parametrosFormControl);

  }
  
  obtenerRestricciones(parameter: IParameterObject): Array<any> {
    const restricciones: Array<any>=[];

    parameter.required?restricciones.push(Validators.required):null;

    (parameter.schema.type === 'string' && parameter.schema.format === 'uuid')?
      restricciones.push(Validators.pattern('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')):null;

    return restricciones;

  }

  tipoParametro(parametro: IParameterObject): {tipoControl: string, tipoDato: string, formato: string}{

    if (parametro.schema.type === 'string' && parametro.schema.format === 'date-time') {
      return { tipoControl:'input', tipoDato:'date', formato:''}
    }  

    if (parametro.schema.type === 'string' && parametro.schema.format === 'uuid') {
      return { tipoControl:'input', tipoDato:'text', formato:'uuid'}
    }  
    
      return { tipoControl:'input', tipoDato:'text',formato:''}
    
    

  }

  iniciarBody(){
    const valor: Array<any> = ['']; // Inicialmente solo tiene el valor inicial que siempre será la cadena vacía
    this.formBody = this.fb.group({ body: [ObtenerBodyRequestComoCadena(this.data.requestBody),[]]});
  }

  obtenerValoresParametros(): Array<IValorParametroPath> {

    const valoresParametros: Array<IValorParametroPath> = []
    this.data.parameters.forEach(
      parametro => {
        const valorParametro: IValorParametroPath = {
          tipo: parametro.in,
          nombre: parametro.name,
          valor: this.formParametros.controls[parametro.name].value
        }
        valoresParametros.push(valorParametro);
      }
    )


    return valoresParametros;

  } 

  onEjecutarOperation(){
    this.tieneParametros?this.valorParametros$.next(this.obtenerValoresParametros()):null;
    this.tieneBody?this.valorBody$.next(this.formBody.controls['body'].value):null;
  }  

}
