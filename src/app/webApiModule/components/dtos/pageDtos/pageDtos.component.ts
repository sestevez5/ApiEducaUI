import { EnumTipoDto } from '../../../models/enumTipoDto';
import { subsistemaModel } from '../../../models/subsistemaModel';
import { IDto } from '../../../models/dtoModel';
import { WebapiService } from '../../../services/webapi.service';
import { Component, Input, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

import { EnumTipoCampoSimple } from 'src/app/webApiModule/models/enumTipoCampoSimple';



const x: IDto[] = [{
  nombreDto: "MatriculaDTO",
  tipoDto: EnumTipoDto.EX,
  subsistema: "Matriculas",
  gestion: "Prueba",
  campos: [
    { nombreCampo: "idMatricula", tipoCampo:"entero", nullable: true},
    { nombreCampo: "idMatricula2", tipoCampo:"entero", nullable: true},
    { nombreCampo: "MatriculaArea", 
      tipoCampo: 
        { nombreDto: "MatriculaAreaDTO", 
          tipoDto: EnumTipoDto.EX, 
          subsistema:"prueba", 
          gestion:"prueba2",
          campos: [
            { nombreCampo: "idMatriculaArea", tipoCampo:"entero", nullable: true},
            { nombreCampo: "infoArea", 
              tipoCampo: 
                { nombreDto: "AreaInfoDTO", 
                  tipoDto: EnumTipoDto.EX, 
                  subsistema:"prueba", 
                  gestion:"prueba2",
                  campos: [ { nombreCampo: "idMatricula", tipoCampo:"entero", nullable: true},
                  { nombreCampo: "idMatricula2", tipoCampo:"entero", nullable: true},
                  { nombreCampo: "MatriculaArea", 
                    tipoCampo: 
                      { nombreDto: "MatriculaAreaDTO", 
                        tipoDto: EnumTipoDto.EX, 
                        subsistema:"prueba", 
                        gestion:"prueba2",
                        campos: [
                          { nombreCampo: "idMatriculaArea", tipoCampo:"entero", nullable: true},
                          { nombreCampo: "infoArea", 
                            tipoCampo: 
                              { nombreDto: "AreaInfoDTO", 
                                tipoDto: EnumTipoDto.EX, 
                                subsistema:"prueba", 
                                gestion:"prueba2",
                                campos: [
                      
                                ] },
                              nullable: true},
              
                        ] },
                      nullable: true}
        
                  ] },
                nullable: true},

          ] },
        nullable: true},
  ]
},
{
  nombreDto: "MatriculaDTO",
  tipoDto: EnumTipoDto.EX,
  subsistema: "Matriculas",
  gestion: "Prueba",
  campos: [
    { nombreCampo: "idMatricula", tipoCampo:"entero", nullable: true},
    { nombreCampo: "idMatricula2", tipoCampo:"entero", nullable: true},
    { nombreCampo: "MatriculaArea", 
      tipoCampo: 
        { nombreDto: "MatriculaAreaDTO", 
          tipoDto: EnumTipoDto.EX, 
          subsistema:"prueba", 
          gestion:"prueba2",
          campos: [
            { nombreCampo: "idMatriculaArea", tipoCampo:"entero", nullable: true},
            { nombreCampo: "infoArea", 
              tipoCampo: 
                { nombreDto: "AreaInfoDTO", 
                  tipoDto: EnumTipoDto.EX, 
                  subsistema:"prueba", 
                  gestion:"prueba2",
                  campos: [ { nombreCampo: "idMatricula", tipoCampo:"entero", nullable: true},
                  { nombreCampo: "idMatricula2", tipoCampo:"entero", nullable: true},
                  { nombreCampo: "MatriculaArea", 
                    tipoCampo: 
                      { nombreDto: "MatriculaAreaDTO", 
                        tipoDto: EnumTipoDto.EX, 
                        subsistema:"prueba", 
                        gestion:"prueba2",
                        campos: [
                          { nombreCampo: "idMatriculaArea", tipoCampo:"entero", nullable: true},
                          { nombreCampo: "infoArea", 
                            tipoCampo: 
                              { nombreDto: "AreaInfoDTO", 
                                tipoDto: EnumTipoDto.EX, 
                                subsistema:"prueba", 
                                gestion:"prueba2",
                                campos: [
                      
                                ] },
                              nullable: true},
              
                        ] },
                      nullable: true}
        
                  ] },
                nullable: true},

          ] },
        nullable: true},
  ]
}


]


@Component({
  selector: 'app-pageDtos',
  templateUrl: './pageDtos.component.html',
  styleUrls: ['./pageDtos.component.css']
})
export class PageDtosComponent implements OnInit {


  @Input() dtos:IDto[] = [];
  
  events: string[] = [];
  opened= false;
  constructor(private was: WebapiService) { 
    was.obtenerDtos().subscribe( 
      datos => {this.dtos = datos}
    );
      // dtos => { this.dtos = dtos} 
      
  }



  ngOnInit(): void {
  }

  log(state:any){
    console.log(state)
  }



}
