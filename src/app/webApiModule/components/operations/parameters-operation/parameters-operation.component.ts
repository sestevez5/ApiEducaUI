import { Component, Input, OnInit } from '@angular/core';
import { IParameterObject } from 'src/app/webApiModule/models/documentoOpenApi3';

@Component({
  selector: 'app-parameters-operation',
  templateUrl: './parameters-operation.component.html',
  styleUrls: ['./parameters-operation.component.css']
})
export class ParametersOperationComponent implements OnInit {

  @Input() parameters: Array<IParameterObject>
  @Input() mostrarDescripciones =true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
