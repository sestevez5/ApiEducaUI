import { IPropertyAux } from '../../../models/modelosAuxiliares';
import { SelectorAgrupacionesComponent } from '../../comunes/selector-agrupaciones/selector-agrupaciones.component';
import { OpenApi3Service } from '../../../services/open-api3.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';


interface IPaginacion {
  longitud: number;
  tamanyoPagina: number;
  opcionesPagina: number[];
  paginaSeleccionada: number;
}


@Component({
  selector: 'app-main-properties',
  templateUrl: './main-properties.component.html',
  styleUrls: ['./main-properties.component.css']
})
export class MainPropertiesComponent {

  panelesExpandidos=false;
  mostrarTiposDePropiedades=true;
  mostrarDescripcionesSchemas=true;


  paginacion: IPaginacion;
  paginaEvent: PageEvent;
  textoFiltro: string='';

  cargando:boolean=false;
  nodoSelecionado: string =''




  properties: IPropertyAux[]

  @Input() mostrarSchemas=true;
  
  constructor(public dialog: MatDialog,private  oas3: OpenApi3Service ) {


    this.oas3.propertiesAux$.subscribe(property => {

      this.paginacion = this.paginacion = {
        longitud:0,
        paginaSeleccionada:0,
        opcionesPagina: [5,10,15,20],
        tamanyoPagina: 15
      };
      this.actualizarDatos();
    }
    );


    
   }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectorAgrupacionesComponent, {
      data: this.nodoSelecionado
    });
    dialogRef.afterClosed().subscribe(result => {
      this.nodoSelecionado = result;
    })
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
      const result: any = this.oas3.obtenerPropertiesFiltradas(this.textoFiltro,this.paginacion.paginaSeleccionada,this.paginacion.tamanyoPagina);
      this.properties = result.datos;
      this.paginacion.longitud = result.numeroElementos;
  }


  onRemove(){
    this.nodoSelecionado='';

  }


}
