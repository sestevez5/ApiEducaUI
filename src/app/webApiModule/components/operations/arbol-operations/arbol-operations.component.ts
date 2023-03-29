import { PanelModalMarkdownComponent } from './../../../../sharedModule/components/panel-modal-markdown/panel-modal-markdown.component';
import { PanelExecuteOperationComponent } from './../panel-execute-operation/panel-execute-operation.component';
import { MatDialog } from '@angular/material/dialog';
import { ICodeWithResponseObject, IOperationObject, IParameterObject, IResponseObject } from './../../../models/documentoOpenApi3';
import { Component, Input, OnInit } from '@angular/core';
import { colorMetodo, ObtenerBodyRequestComoCadena} from '../../../services/utils'


@Component({
  selector: 'app-arbol-operations',
  templateUrl: './arbol-operations.component.html',
  styleUrls: ['./arbol-operations.component.css']
})
export class ArbolOperationsComponent implements OnInit {

  @Input() operation: IOperationObject | undefined; 
  @Input() mostrarDescripcionesOperations=true;
  @Input() expandido: boolean = false;

  descripcionExpandida: false;

  respuestasExpanded: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }



  
  colorMetodo(metodo: string): {color:string, nombreMetodo:string, colorFondo:string, colorFondoClaro} {
    return colorMetodo(metodo);
  }

  parametrosPath(): Array<IParameterObject> | undefined {



    let parameters: Array<IParameterObject> | undefined = undefined;
      this.operation.parameters?parameters=this.operation.parameters.filter(parameter => parameter.in === 'path'):undefined;
      return parameters;
  }

  parametrosQuery(): Array<IParameterObject> | undefined {

    if (this.operation.parameters) {

      const parametrosQuery = this.operation.parameters.filter(parameter => parameter.in === 'query');
      return parametrosQuery.length > 0? parametrosQuery:undefined;
    } else return undefined;
  }

  bodyComoCadena(): string | undefined {
    return this.operation.requestBody?ObtenerBodyRequestComoCadena(this.operation.requestBody):undefined;
  }

  openDialogPanelEjecucion() {
    const dialogRef = this.dialog.open(PanelExecuteOperationComponent, {
      data: this.operation,
      width: '100%'
    });
  }

  onEjecutar(){
    this.openDialogPanelEjecucion();
  }

  validResponses(): ICodeWithResponseObject[] | undefined {
    return this.operation.responses.filter(r => r.response.content[0]);

  }

  openDialogPanelMensaje(cadena:string) {
    const dialogRef = this.dialog.open(PanelModalMarkdownComponent, {
      data: cadena,
      width: '100%'
    });
  }

  onMostrarMensaje(cadena: string){
    
    this.openDialogPanelMensaje(cadena);

  }


  
}


