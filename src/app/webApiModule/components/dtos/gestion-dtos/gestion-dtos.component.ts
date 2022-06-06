import { WebapiService } from './../../../services/webapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-dtos',
  templateUrl: './gestion-dtos.component.html',
  styleUrls: ['./gestion-dtos.component.css']
})
export class GestionDtosComponent implements OnInit {

  constructor(private was: WebapiService) { 

   
   
  }

  ngOnInit(): void {
  }

}
