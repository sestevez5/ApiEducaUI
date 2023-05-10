import { IOperationObject } from './../../../models/documentoOpenApi3';
import { OpenApi3Service } from '../../../services/open-api3.service';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { PageEvent } from '@angular/material/paginator';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

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
export class MainOperationsComponent implements OnInit  {
  panelesExpandidos=true;
  mostrarTiposDeCampos=true;
  mostrarDescripcionesOperations=true;
  mostrarMetodosGET=true;
  mostrarMetodosPOST=true;
  mostrarMetodosPUT=true;
  mostrarMetodosDELETE=true;
  mostrarAgrupados=false;

  paginacion: IPaginacion;
  paginaEvent: PageEvent;
  textoFiltro: string='';




  @ViewChild(MatAccordion) acordeon!: MatAccordion;
  operations : IOperationObject[];

  tags: {tag0:string, tag1:string}[]=[];

  @Input() mostrarOperations=true;
  @Input() OpAutenticacion = false;
  


  constructor(public dialog: MatDialog, private was1: OpenApi3Service) { 

  this.was1.operations$.subscribe(operations => {
    this.paginacion = this.paginacion = {
      longitud:0,
      paginaSeleccionada:0,
      opcionesPagina: [5,10,15,20],
      tamanyoPagina: 20
    };


  })

  }

  ngOnInit(): void {
    this.actualizarDatos();
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

  onCambiarFiltroMetodo(metodo: string) {

    switch (metodo) {
      case 'GET':
        this.mostrarMetodosGET=!this.mostrarMetodosGET;
        break;
      case 'POST':
        this.mostrarMetodosPOST=!this.mostrarMetodosPOST;
        break;
      case 'PUT':
        this.mostrarMetodosPUT=!this.mostrarMetodosPUT;
        break;
      case 'DELETE':
        this.mostrarMetodosDELETE=!this.mostrarMetodosDELETE;
        break;
    
      default:
        break;
    }

    this.paginacion.paginaSeleccionada=0;
    this.actualizarDatos();

  }

  onAgrupar() {
    this.mostrarAgrupados = !this.mostrarAgrupados;
    this.actualizarDatos();
  }



  actualizarDatos()
  {
        console.log('auth', this.OpAutenticacion);
        const result: any = this.was1.obtenerOperationsFiltrados(this.textoFiltro,this.paginacion.paginaSeleccionada,this.paginacion.tamanyoPagina, this.OpAutenticacion, this.mostrarMetodosGET, this.mostrarMetodosPOST, this.mostrarMetodosPUT, this.mostrarMetodosDELETE, this.mostrarAgrupados);
        this.operations = result.datos;
        this.calcularTags();
        this.paginacion.longitud = result.numeroElementos;
  
  }

  calcularTags() {
    const tags = [];

    this.operations.forEach(
      operation => {
        const tag0 = operation.tags[0]?operation.tags[0]:'';
        const tag1 = operation.tags[1]?operation.tags[1]:'';

        const noExisteEnTags = tags.filter( t => t.tag0==tag0 && t.tag1==tag1).length == 0;

        noExisteEnTags ? tags.push({tag0:tag0, tag1:tag1}):null;

      }
    );

    this.tags = tags.sort( (a,b) => {

      if( a.tag0+a.tag1 < b.tag0+b.tag1) return -1
      else return 1;
  })
}



  operationsTags(t: { tag0: string, tag1: string}){
    return this.operations.filter(operation => {
      const tag0 = operation.tags[0]?operation.tags[0]:'';
      const tag1 = operation.tags[1]?operation.tags[1]:'';

      return tag0 == t.tag0  && tag1 == t.tag1;

    })
  }

  
}

