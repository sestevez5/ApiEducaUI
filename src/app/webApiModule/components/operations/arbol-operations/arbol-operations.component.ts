import { PanelExecuteOperationComponent } from './../panel-execute-operation/panel-execute-operation.component';
import { MatDialog } from '@angular/material/dialog';
import { ICodeWithResponseObject, IOperationObject, IParameterObject, IResponseObject } from './../../../models/documentoOpenApi3';
import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { ObtenerBodyRequestComoCadena } from '../../../services/utils'

@Component({
  selector: 'app-arbol-operations',
  templateUrl: './arbol-operations.component.html',
  styleUrls: ['./arbol-operations.component.css']
})
export class ArbolOperationsComponent implements OnInit {

  @Input() operation: IOperationObject | undefined; 
  @Input() mostrarDescripcionesOperations=true;
  @Input() expandido: boolean = false;

  respuestasExpanded: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }



  
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

  openDialog() {

  const dialogRef = this.dialog.open(PanelExecuteOperationComponent, {
    data: this.operation
  });

 
  }

  onEjecutar(){
    this.openDialog();
  }

  validResponses(): ICodeWithResponseObject[] | undefined {
    return this.operation.responses.filter(r => r.response.content[0]);

  }


  
}


