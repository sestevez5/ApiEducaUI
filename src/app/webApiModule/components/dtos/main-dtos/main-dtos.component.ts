import { WebapiService } from './../../../services/webapi.service';
import { SelectorAgrupacionesComponent } from './../selector-agrupaciones/selector-agrupaciones.component';
import { IDto } from './../../../models/dtoModel';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component,Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BehaviorSubject, debounceTime, distinctUntilChanged, skip } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { NumberFormatStyle } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';


interface IPaginacion {
  longitud: number;
  tamanyoPagina: number;
  opcionesPagina: number[];
  paginaSeleccionada: number;
}


@Component({
  selector: 'app-main-dtos',
  templateUrl: './main-dtos.component.html',
  styleUrls: ['./main-dtos.component.css']
})
export class MainDtosComponent{

  panelesExpandidos=false;
  mostrarTiposDeCampos=true;
  mostrarDescripcionesDtos=true;


  paginacion: IPaginacion;
  paginaEvent: PageEvent;
  textoFiltro: string='';

  cargando:boolean=false;


  @ViewChild(MatAccordion) acordeon!: MatAccordion;
  dtos : IDto[];
  
  constructor(public dialog: MatDialog,private  was: WebapiService ) {

   
    this.was.dtos$.subscribe(dtos => {


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
    this.dialog.open(SelectorAgrupacionesComponent);
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
   
      const result: any = this.was.obtenerDtos(this.textoFiltro,this.paginacion.paginaSeleccionada,this.paginacion.tamanyoPagina);
      this.dtos = result.datos;
      this.paginacion.longitud = result.numeroElementos;

    
 

  }

}


