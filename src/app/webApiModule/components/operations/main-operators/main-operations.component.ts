import { IOperationObject } from './../../../models/documentoOpenApi3';
import { OpenApi3Service } from '../../../services/open-api3.service';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { PageEvent } from '@angular/material/paginator';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

interface IPaginacion {
  longitud: number;
  tamanyoPagina: number;
  opcionesPagina: number[];
  paginaSeleccionada: number;
}

@Component({
  selector: 'app-main-operations',
  templateUrl: './main-operations.component.html',
  styleUrls: ['./main-operations.component.css']
})
export class MainOperationsComponent  {
  panelesExpandidos=true;
  mostrarTiposDeCampos=true;
  mostrarDescripcionesOperations=true;

  paginacion: IPaginacion;
  paginaEvent: PageEvent;
  textoFiltro: string='';

  cargando:boolean=false;


  @ViewChild(MatAccordion) acordeon!: MatAccordion;
  operations : IOperationObject[];

  @Input() mostrarOperations=true;

  constructor(public dialog: MatDialog, private was1: OpenApi3Service) { 

  this.was1.operations$.subscribe(operations => {
    this.paginacion = this.paginacion = {
      longitud:0,
      paginaSeleccionada:0,
      opcionesPagina: [5,10,15,20],
      tamanyoPagina: 15
    };

    this.actualizarDatos();
  })
  }

  
  openDialog() {
    //this.dialog.open(SelectorAgrupacionesComponent);
  }

  onExpandirToggle() {
    this.panelesExpandidos = !this.panelesExpandidos;
  }


  onSeleccionarPagina(event){
    this.paginacion.paginaSeleccionada=event.pageIndex;
    this.paginacion.tamanyoPagina=event.pageSize;
    this.actualizarDatos();
  }




  onCambiarTextoFiltro(nuevoTexto:string){
    this.textoFiltro=nuevoTexto;
    this.paginacion.paginaSeleccionada=0;
    this.actualizarDatos();
  }



  actualizarDatos()
  {
      const result: any = this.was1.obtenerOperationsFiltrados(this.textoFiltro,this.paginacion.paginaSeleccionada,this.paginacion.tamanyoPagina);
      this.operations = result.datos;
      this.paginacion.longitud = result.numeroElementos;
  }
}

