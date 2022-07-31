import { OpenApi3Service } from './../../../services/open-api3.service';
import { MatDialog } from '@angular/material/dialog';
import { ISchemaObject, ISchemaObjectWithKey } from './../../../models/documentoOpenApi3';
import { MatAccordion } from '@angular/material/expansion';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

interface IPaginacion {
  longitud: number;
  tamanyoPagina: number;
  opcionesPagina: number[];
  paginaSeleccionada: number;
}


@Component({
  selector: 'app-main-schemas',
  templateUrl: './main-schemas.component.html',
  styleUrls: ['./main-schemas.component.css']
})
export class MainSchemasComponent {

  
  panelesExpandidos=false;
  mostrarTiposDePropiedades=true;
  mostrarDescripcionesSchemas=true;


  paginacion: IPaginacion;
  paginaEvent: PageEvent;
  textoFiltro: string='';

  cargando:boolean=false;


  @ViewChild(MatAccordion) acordeon!: MatAccordion;
  schemas : ISchemaObjectWithKey[];

  @Input() mostrarSchemas=true;
  
  constructor(public dialog: MatDialog,private  oas3: OpenApi3Service ) {

   
    this.oas3.schemas$.subscribe(schemas => {

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
   
      const result: any = this.oas3.obtenerSchemas(this.textoFiltro,this.paginacion.paginaSeleccionada,this.paginacion.tamanyoPagina);
      this.schemas = result.datos;
      this.paginacion.longitud = result.numeroElementos;

    
 

  }

  ObtenerSchemasTipoObjeto(): Array<ISchemaObjectWithKey> {
    return this.schemas.filter(schema => schema.value.type === 'object')
  }

}
