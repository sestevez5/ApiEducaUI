import { IParameterObject } from './../../../models/documentoOpenApi3';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameter-operation',
  templateUrl: './parameter-operation.component.html',
  styleUrls: ['./parameter-operation.component.css']
})
export class ParameterOperationComponent implements OnInit {

  @Input() parameter: IParameterObject;

  constructor() { }

  ngOnInit(): void {
  }

}
