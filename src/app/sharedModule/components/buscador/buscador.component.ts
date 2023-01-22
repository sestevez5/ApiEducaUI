import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import { BehaviorSubject, debounceTime, skip, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  @Output() texto: EventEmitter<string> = new EventEmitter<string>();

  _textoFiltro: BehaviorSubject<string>= new BehaviorSubject('');
  get textoFiltro(): string { return this._textoFiltro.getValue(); }
  set textoFiltro(val: string) { this._textoFiltro.next(val); }



  constructor() { }

  ngOnInit(): void {

    this._textoFiltro
    .pipe(
      skip(1), // El primer valor del cuadro de texto queremos omitirlo.
      debounceTime(700),
      distinctUntilChanged()
    )
    .subscribe(valor =>
      {
        this.texto.emit(valor)

      } );
  }

}
