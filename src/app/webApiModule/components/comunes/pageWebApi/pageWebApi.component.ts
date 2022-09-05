import { GestionarTokenComponent } from './../gestionar-token/gestionar-token.component';
import { MatDialog } from '@angular/material/dialog';
import { OpenApi3Service } from './../../../services/open-api3.service';
import { Component } from '@angular/core';
import {MatSnackBar } from '@angular/material/snack-bar'
import { IServerObject } from 'src/app/webApiModule/models/documentoOpenApi3';




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
  servidoresActuales: IServerObject[] | undefined = undefined;
  servidorSeleccionado: IServerObject | undefined = undefined;
  rutaSeleccionada: OrigenDatosOpenApi;
  rutaSeleccionadaOld: OrigenDatosOpenApi;
  cargando= false;
  token: string ='';

  constructor(
    private was: OpenApi3Service, 
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ){


    was.tokenActual$.subscribe(nuevoToken => this.token=nuevoToken);
 
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
      schemas => { 
        this.cargando=false;
        this.rutaSeleccionadaOld = this.rutaSeleccionada
      }
    );

    was.obtenerServidores().subscribe(
      servidores => {

        
        this.servidoresActuales = servidores;
        if (servidores.length>0){
          this.onSeleccionarServidor(this.servidoresActuales[0].url);
        } else {
          this.onSeleccionarServidor(undefined);
        }

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

  onSeleccionarServidor(urlServidor:string) {

    this.servidorSeleccionado=this.servidoresActuales.filter(servidor => servidor.url === urlServidor)[0];
    this.was.cambiarServidor(this.servidorSeleccionado);
  }

  onEliminarToken() {
    this.was.eliminarToken();
  }

  onReestablecerToken() {

    console.log('restablecer')

    const dialogRef = this.dialog.open(GestionarTokenComponent);

    dialogRef.afterClosed().subscribe(result => {

    });

  }


}
