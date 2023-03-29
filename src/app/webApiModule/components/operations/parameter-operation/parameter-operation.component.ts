import { PanelModalMarkdownComponent } from './../../../../sharedModule/components/panel-modal-markdown/panel-modal-markdown.component';
import { IParameterObject } from './../../../models/documentoOpenApi3';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-parameter-operation',
  templateUrl: './parameter-operation.component.html',
  styleUrls: ['./parameter-operation.component.css']
})
export class ParameterOperationComponent implements OnInit {

  @Input() parameter: IParameterObject;
  @Input() mostrarDescripciones =true;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogPanelEjecucion(nombreParametro: string, descripcionParametro: string) {
    
    const dialogRef = this.dialog.open(PanelModalMarkdownComponent, {
      data: {
        cabecera: "**Parametro:** "+ nombreParametro,
        contenidoMarkdown: "**Descripcion:** \n\n\r "+descripcionParametro
  
      },
      width: '100%'
    });
  }

  onEjecutar(nombreParametro: string, descripcionParametro: string){

    this.openDialogPanelEjecucion(nombreParametro, descripcionParametro);
  }

}
