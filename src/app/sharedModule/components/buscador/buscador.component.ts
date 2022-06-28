import { Component, OnInit, Input, Output, } from '@angular/core';
import { BehaviorSubject, debounceTime, skip } from 'rxjs';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  @Output() texto

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
    .subscribe(val => {
      this.dtosFiltrados=this.dtos.filter(dto => dto.nombreDto.toLowerCase().includes(val.toLowerCase()))
      this.actualizarListaDtos();
    }
      );
  }

}
