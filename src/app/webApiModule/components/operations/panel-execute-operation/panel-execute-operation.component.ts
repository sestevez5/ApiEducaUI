import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { IDatosEjecucionOperation, IValorParametroPath, EjecucionOperation } from './../../../models/datosEjecucionOperation';
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
export class PanelExecuteOperationComponent implements OnInit {

  
  formParametros: FormGroup;
  tieneParametros: boolean;
  formBody: FormGroup;
  tieneBody: boolean;
  ejecucionOperation: EjecucionOperation;
  
  valorParametros$: BehaviorSubject<Array<IValorParametroPath>> = new BehaviorSubject([])




  

  constructor(
    public dialogRef: MatDialogRef<PanelExecuteOperationComponent >,
    @Inject(MAT_DIALOG_DATA) public data: IOperationObject,
    private oa3: OpenApi3Service,
    private fb: FormBuilder

  ) { 

    this.tieneParametros = data.parameters?true:false;
    this.tieneParametros?this.iniciarParametros():null;
  

    this.tieneBody = data.requestBody?true:false;
    this.tieneBody?this.iniciarBody():null;

    this.ejecucionOperation = new EjecucionOperation(
      {
        servidor: this.servidorActual(),
        path: data.path,
        parametros: this.obtenerValoresParametros(),
        tokenAutentication: oa3.tokenActual      
      }
    )


    combineLatest(
      [
        oa3.serverActual$,
        oa3.tokenActual$,
        this.valorParametros$
      ]
    )
    .pipe(
      map( combinacion => {

        return {
          servidorActual: combinacion[0],
          tokenActual: combinacion[1],
          valorParametrosActuales: combinacion[2]
        }
        
      })
    ).subscribe(
      combinacion => {



        this.ejecucionOperation.ActualizarDatos({
          
            servidor: combinacion.servidorActual.url,
            path: data.path,
            parametros: combinacion.valorParametrosActuales,
            tokenAutentication: combinacion.tokenActual      
          
        });

    

      }
    )


   

  }

  ngOnInit(): void {

    
  }

  onCerrar(): void {
    this.dialogRef.close();
  }

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

  tipoParametro(parametro: IParameterObject): {tipoControl: string, tipoDato: string}{

     if (parametro.schema.type === 'string' && parametro.schema.format === 'date-time') {
      return { tipoControl:'input', tipoDato:'date'}
    }  else
    {
      return { tipoControl:'input', tipoDato:'text'}
    }
    

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
        console.log(this.formParametros);
        valoresParametros.push(valorParametro);
      }
    )


    return valoresParametros;

  } 

  onEjecutarOperation(){

    this.valorParametros$.next(this.obtenerValoresParametros());

    this.ejecucionOperation.ejecutar();

  }
  


 
  

}
