import { OpenApi3Service } from './../../../services/open-api3.service';
import { WebapiService } from './../../../services/webapi.service';

import { IDto } from '../../../models/dtoModel';

import { Component, Input, OnInit } from '@angular/core';

import {MatSnackBar } from '@angular/material/snack-bar'



interface OrigenDatosOpenApi {
  orden: number;
  url: string;
  descripcion: string;
}

@Component({
  selector: 'app-pageWebApi',
  templateUrl: './pageWebApi.component.html',
  styleUrls: ['./pageWebApi.component.css']
})
export class PageWebApiComponent {

  documentosOpenApiPrefijados: OrigenDatosOpenApi[]=[];
  rutaSeleccionada: OrigenDatosOpenApi;
  rutaSeleccionadaOld: OrigenDatosOpenApi;
  cargando= false;
  token: string ='';

  constructor(private was: OpenApi3Service, private snackBar: MatSnackBar){


      was.token$.subscribe(nuevoToken => this.token=nuevoToken);

 
    was.erroresCargaDocumentoOpenApi$.subscribe(
      error =>  {

        if(error) {
        const x = this.snackBar.open(error, "cerrar");
        x.afterDismissed().subscribe(() => {
         
          this.cargando=false;
          this.rutaSeleccionada=this.rutaSeleccionadaOld;
          
        });
        x.onAction().subscribe(() => {
          this.cargando=false;
          this.rutaSeleccionada=this.rutaSeleccionadaOld;
        });
      
        }

      
    }
    )

    was.schemas$.subscribe(
      dtos => { 
        this.cargando=false;
        this.rutaSeleccionadaOld = this.rutaSeleccionada
      }
    )

    was.obtenerRutasPreestablecidasDocumentosOpenApi3().subscribe(
      rutas => {
        if (rutas.length>0){
        this.documentosOpenApiPrefijados=rutas;
        this.onSeleccionarRuta(this.documentosOpenApiPrefijados[0].url);
        }
      }
    )
  }

  onSeleccionarRuta(ruta:string) {
  
    this.rutaSeleccionada=this.documentosOpenApiPrefijados.filter(doc => doc.url === ruta)[0];
    this.cargando=true;
    this.was.cambiarDocumento(this.rutaSeleccionada.url)
  }

  onEliminarToken() {
    this.was.eliminarToken
  }
}
