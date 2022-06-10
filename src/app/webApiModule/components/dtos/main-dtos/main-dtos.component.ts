import { IDto } from './../../../models/dtoModel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-dtos',
  templateUrl: './main-dtos.component.html',
  styleUrls: ['./main-dtos.component.css']
})
export class MainDtosComponent implements OnInit {


  @Input() dtos: IDto[]=[];
  
  constructor() { }

  ngOnInit(): void {


  }

}
