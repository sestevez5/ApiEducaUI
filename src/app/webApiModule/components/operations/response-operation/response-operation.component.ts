import { Component, Input, OnInit } from '@angular/core';
import { ICodeWithResponseObject, IResponseObject } from 'src/app/webApiModule/models/documentoOpenApi3';

@Component({
  selector: 'app-response-operation',
  templateUrl: './response-operation.component.html',
  styleUrls: ['./response-operation.component.css']
})
export class ResponseOperationComponent implements OnInit {

  @Input() responseWithCode: ICodeWithResponseObject;
  @Input() mostrarDescripciones =true;
  constructor() { }

  ngOnInit(): void {

    // console.log(this.responseWithCode.response.content[0].schema);
  }

}
