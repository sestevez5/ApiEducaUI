import { Component, OnInit } from '@angular/core';
import { OrigenDatosOpenApi3 } from 'src/app/webApiModule/models/documentoOpenApi3';
import { OpenApi3Service } from 'src/app/webApiModule/services/open-api3.service';


@Component({
  selector: 'app-selector-documento-openapi3',
  templateUrl: './selector-documento-openapi3.component.html',
  styleUrls: ['./selector-documento-openapi3.component.css']
})
export class SelectorDocumentoOpenapi3Component implements OnInit {

  documentosopeApi3: OrigenDatosOpenApi3[];
  documentoSeleccionado: OrigenDatosOpenApi3 | undefined;
  constructor(private oa3: OpenApi3Service) { 

    oa3.rutasPreestablecidasDocumentosOpenApi3$.subscribe(
      documentos => this.documentosopeApi3 = documentos.sort((a,b) => a.orden-b.orden)
    );

  }

  ngOnInit(): void {
  }

  onSeleccionado(ods: OrigenDatosOpenApi3) {

    this.documentoSeleccionado = ods;
    console.log(this.documentoSeleccionado);

  }

}
