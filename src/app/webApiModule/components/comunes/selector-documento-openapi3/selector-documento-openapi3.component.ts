import { Component, OnInit, Input } from '@angular/core';
import { OrigenDatosOpenApi3 } from 'src/app/webApiModule/models/documentoOpenApi3';
import { OpenApi3Service } from 'src/app/webApiModule/services/open-api3.service';


@Component({
  selector: 'app-selector-documento-openapi3',
  templateUrl: './selector-documento-openapi3.component.html',
  styleUrls: ['./selector-documento-openapi3.component.css']
})
export class SelectorDocumentoOpenapi3Component {

  documentosopeApi3: OrigenDatosOpenApi3[];
  documentoSeleccionado: OrigenDatosOpenApi3 | undefined;
  
  constructor(private oa3: OpenApi3Service) { 

    oa3.rutasPreestablecidasDocumentosOpenApi3$.subscribe(
      documentos => this.documentosopeApi3 = documentos.sort((a,b) => a.orden-b.orden)
    );

    oa3.rutaDocumentoOpenApiActual$.subscribe(
      url => {

         const d = this.documentosopeApi3.filter( d => d.url === url);
         if (d.length>0) {
          this.documentoSeleccionado = d[0];

         }

      }
    );


  }

  onSeleccionado(ods: OrigenDatosOpenApi3) {

    this.documentoSeleccionado = ods;


  }

  onAceptar() {

   
    this.oa3.cambiarDocumento(this.documentoSeleccionado.url);

    

  }



}
