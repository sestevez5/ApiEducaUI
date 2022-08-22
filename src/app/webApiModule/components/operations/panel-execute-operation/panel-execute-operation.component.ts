import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenApi3Service } from './../../../services/open-api3.service';
import { IOpenApiObject3, IOperationObject, IParameterObject } from './../../../models/documentoOpenApi3';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { colorMetodo } from '../../../services/utils'

interface parametroFormControl {
  valorInicial: string;
  restricciones: Array<any>;
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
    this.tieneParametros?this.iniciarParametros():null;
    this.formParametros = fb.group({});




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

    this.data.parameters.forEach(
      parameter => {
        const pfc: parametroFormControl = {
          valorInicial: '',
          restricciones: []
          // this.obtenerRestricciones(parameter)
        } 
      }
    )

  }

  obtenerRestricciones(parameter: IParameterObject): Array<any> {
    const restricciones: Array<any>=[];

    parameter.required?restricciones.push(Validators.required):null;

    return restricciones;

  }

  

}
