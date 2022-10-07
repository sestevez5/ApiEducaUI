
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrigenDatosOpenApi3 } from 'src/app/webApiModule/models/documentoOpenApi3';


@Component({
  selector: 'app-item-documento-openapi3',
  templateUrl: './item-documento-openapi3.component.html',
  styleUrls: ['./item-documento-openapi3.component.css']
})
export class ItemDocumentoOpenApi3Component implements OnInit {

  @Input() origenDatosOpenapi3: OrigenDatosOpenApi3 | undefined; 
  @Input() itemSeleccionado: boolean=false;
  @Output() origenDatoSeleccionado: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onSeleccionar() {
    this.origenDatoSeleccionado.emit(null);
  }

}
