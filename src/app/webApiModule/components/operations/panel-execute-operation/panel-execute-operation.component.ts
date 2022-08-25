import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenApi3Service } from './../../../services/open-api3.service';
import { IOpenApiObject3, IOperationObject, IParameterObject } from './../../../models/documentoOpenApi3';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { colorMetodo } from '../../../services/utils'

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
  

  constructor(
    public dialogRef: MatDialogRef<PanelExecuteOperationComponent >,
    @Inject(MAT_DIALOG_DATA) public data: IOperationObject,
    private oa3: OpenApi3Service,
    private fb: FormBuilder

  ) { 

   


    this.tieneParametros = data.parameters?true:false;
    console.log('this.tieneParametros',this.tieneParametros);
    this.tieneParametros?this.iniciarParametros():null;


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

 
  

}
