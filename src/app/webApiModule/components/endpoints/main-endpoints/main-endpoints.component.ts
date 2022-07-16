import { OpenApi3Service } from './../../../services/open-api3.service';
import { IEndpoint } from './../../../models/endpointModel';
import { WebapiService } from './../../../services/webapi.service';
import { MatDialog } from '@angular/material/dialog';
import { IDto } from './../../../models/dtoModel';
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
  selector: 'app-main-endpoints',
  templateUrl: './main-endpoints.component.html',
  styleUrls: ['./main-endpoints.component.css']
})
export class MainEndpointsComponent {
  panelesExpandidos=false;
  mostrarTiposDeCampos=true;
  mostrarDescripcionesEndpoints=true;


  paginacion: IPaginacion;
  paginaEvent: PageEvent;
  textoFiltro: string='';

  cargando:boolean=false;


  @ViewChild(MatAccordion) acordeon!: MatAccordion;
  endpoints : IEndpoint[];

  @Input() mostrarEndpoints=true;
  
  constructor(public dialog: MatDialog,private  was: WebapiService, was1: OpenApi3Service) {

   
    this.was.endpoints$.subscribe(endpoints => {
      this.paginacion = this.paginacion = {
        longitud:0,
        paginaSeleccionada:0,
        opcionesPagina: [5,10,15,20],
        tamanyoPagina: 15
      };

      this.actualizarDatos();

      was1.actualizarOpenApiObject3Actual();

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
   
      const result: any = this.was.obtenerEndpointsFiltrados(this.textoFiltro,this.paginacion.paginaSeleccionada,this.paginacion.tamanyoPagina);
      this.endpoints = result.datos;
      this.paginacion.longitud = result.numeroElementos;

    
 

  }

}
