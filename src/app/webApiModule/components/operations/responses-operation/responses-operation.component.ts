import { Component, Input, OnInit } from '@angular/core';
import { ICodeWithResponseObject, IResponseObject } from 'src/app/webApiModule/models/documentoOpenApi3';

@Component({
  selector: 'app-responses-operation',
  templateUrl: './responses-operation.component.html',
  styleUrls: ['./responses-operation.component.css']
})
export class ResponsesOperationComponent implements OnInit {

  @Input() responsesWithCodeHttp: Array<ICodeWithResponseObject>
  @Input() mostrarDescripciones =true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
