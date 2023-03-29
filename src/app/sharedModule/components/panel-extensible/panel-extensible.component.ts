import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-extensible',
  templateUrl: './panel-extensible.component.html',
  styleUrls: ['./panel-extensible.component.css']
})
export class PanelExtensibleComponent implements OnInit {

  @Input() textoCabecera: string;
  @Input() contenido: string;

  descripcionExpandida=false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleExpandir(){
    this.descripcionExpandida = !this.descripcionExpandida;
  }

}
