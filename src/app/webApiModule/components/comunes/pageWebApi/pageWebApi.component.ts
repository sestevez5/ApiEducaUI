import { GestionarTokenComponent } from './../gestionar-token/gestionar-token.component';
import { MatDialog } from '@angular/material/dialog';
import { OpenApi3Service } from './../../../services/open-api3.service';
import { Component } from '@angular/core';
import {MatSnackBar } from '@angular/material/snack-bar'
import { IServerObject, OrigenDatosOpenApi3 } from 'src/app/webApiModule/models/documentoOpenApi3';
import { SelectorDocumentoOpenapi3Component } from '../selector-documento-openapi3/selector-documento-openapi3.component';
import { defaultRippleAnimationConfig } from '@angular/material/core';


@Component({
  selector: 'app-pageWebApi',
  templateUrl: './pageWebApi.component.html',
  styleUrls: ['./pageWebApi.component.css']
})
export class PageWebApiComponent {

  documentosOpenApiPrefijados: OrigenDatosOpenApi3[]=[];
  servidoresActuales: IServerObject[] | undefined = undefined;
  servidorSeleccionado: IServerObject | undefined = undefined;
  documentoSeleccionado: OrigenDatosOpenApi3;
  documentoSeleccionadaOld: OrigenDatosOpenApi3;
  cargando= false;
  token: string ='';
  persistirToken = false;

  constructor(
    private was: OpenApi3Service, 
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ){


    was.tokenActual$.subscribe(nuevoToken => {
      this.token=nuevoToken;
      this.token?this.snackBar.open('Se ha añadido un nuevo token JWT','Cerrar',{duration:2500}):null;
    });
 
    
    was.erroresCargaDocumentoOpenApi$.subscribe(
      error =>  {

        if(error) {
        const x = this.snackBar.open(error, "cerrar");
        x.afterDismissed().subscribe(() => {
         
          this.cargando=false;
          this.documentoSeleccionado=this.documentoSeleccionadaOld;
          
        });
        x.onAction().subscribe(() => {
          this.cargando=false;
          this.documentoSeleccionado=this.documentoSeleccionadaOld;
        });
      
        }
    }
    )

    was.rutaDocumentoOpenApiActual$.subscribe(
      url => {
        const doc = this.documentosOpenApiPrefijados.filter( d => d.url === url);

        if (doc && doc.length>0) {
          this.documentoSeleccionado = doc[0];
        }

      }
    )

    was.cargandoDocumento$.subscribe( cargando => this.cargando = cargando )

    was.schemas$.subscribe(schemas =>   this.documentoSeleccionadaOld = this.documentoSeleccionado);

    was.operations$.subscribe(operations => this.documentoSeleccionadaOld = this.documentoSeleccionado );

    was.obtenerServidores().subscribe(
      servidores => {
        if (this.documentoSeleccionado && this.documentoSeleccionado.servidoresAlternativos.length>0){
          this.servidoresActuales = this.documentoSeleccionado.servidoresAlternativos 
        }
        else {
          this.servidoresActuales = servidores;
        }
               
        if (this.servidoresActuales.length>0){
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

             
          // Intentamos localizar la ruta el localStore.
          const url=localStorage.getItem('urlDocumentoEspecificacionOpenApi');
          
          // Si la localizamos (url=true) la establacemos como tura por defaultRippleAnimationConfig.
          // En caso contrario se toma la primera de la lista. es lo que hace lar tres siguientes líneas.
          url?  
          this.onSeleccionarRuta(url):  
          this.onSeleccionarRuta(this.documentosOpenApiPrefijados.sort((d1,d2) => d1.orden - d2.orden)[0].url);
        }
      }
    )
  }

  onSeleccionarRuta(ruta:string) {
    console.log(ruta);
    this.documentoSeleccionado=this.documentosOpenApiPrefijados.filter(doc => doc.url === ruta)[0];
    this.was.cambiarDocumento(this.documentoSeleccionado.url)
  }

  onSeleccionarServidor(urlServidor:string) {

    this.servidorSeleccionado=this.servidoresActuales.filter(servidor => servidor.url === urlServidor)[0];
    this.was.cambiarServidor(this.servidorSeleccionado);
  }

  onEliminarToken() {
    this.was.eliminarToken();
  }

  onReestablecerToken() {
    const dialogRef = this.dialog.open(GestionarTokenComponent);
    dialogRef.afterClosed().subscribe(result => {
    });

  }

  onSeleccionarDocumentoOpenApi3() {
    const dialogRef = this.dialog.open(SelectorDocumentoOpenapi3Component);
  }

  onPersistirToken() {

    this.persistirToken=!this.persistirToken;
  }
}
