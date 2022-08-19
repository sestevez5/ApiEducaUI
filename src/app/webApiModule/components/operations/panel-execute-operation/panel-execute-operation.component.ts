import { OpenApi3Service } from './../../../services/open-api3.service';
import { IOpenApiObject3, IOperationObject } from './../../../models/documentoOpenApi3';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { colorMetodo } from '../../../services/utils'

@Component({
  selector: 'app-panel-execute-operation',
  templateUrl: './panel-execute-operation.component.html',
  styleUrls: ['./panel-execute-operation.component.css']
})
export class PanelExecuteOperationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PanelExecuteOperationComponent >,
    @Inject(MAT_DIALOG_DATA) public data: IOperationObject,
    private oa3: OpenApi3Service

  ) { 


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

  

}
