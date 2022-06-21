import { SelectorAgrupacionesComponent } from './../selector-agrupaciones/selector-agrupaciones.component';
import { IDto } from './../../../models/dtoModel';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component,Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BehaviorSubject, debounceTime, distinctUntilChanged, skip } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-main-dtos',
  templateUrl: './main-dtos.component.html',
  styleUrls: ['./main-dtos.component.css']
})
export class MainDtosComponent implements OnInit,  OnChanges {

  panelesExpandidos=false;
  mostrarTiposDeCampos=true;
  mostrarDescripcionesDtos=true;

  _textoFiltro: BehaviorSubject<string>= new BehaviorSubject('');
  get textoFiltro(): string { return this._textoFiltro.getValue(); }
  set textoFiltro(val: string) { this._textoFiltro.next(val); }


  @ViewChild(MatAccordion) acordeon!: MatAccordion;
  @Input() dtos: IDto[]=[];
  dtosFiltrados: IDto[]=[];
  
  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(SelectorAgrupacionesComponent);
  }

  ngOnInit(): void {
    
    this._textoFiltro
    .pipe(
      skip(1), // El primer valor del cuadro de texto queremos omitirlo.
      debounceTime(700),
      distinctUntilChanged()
    )
    .subscribe(val => this.dtosFiltrados=this.dtos.filter(dto => dto.nombreDto.toLowerCase().includes(val.toLowerCase())))
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dtosFiltrados=this.dtos;
  }

   
  

  onExpandirToggle() {
    this.panelesExpandidos = !this.panelesExpandidos;
  }

}


