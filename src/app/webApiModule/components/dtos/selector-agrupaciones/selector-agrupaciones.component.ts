import { Component, OnInit } from '@angular/core';

interface nodosAgrupamientos {
  texto:string;
  id: string;
  codigo: string;
  hijos: nodosAgrupamientos[];
}

@Component({
  selector: 'app-selector-agrupaciones',
  templateUrl: './selector-agrupaciones.component.html',
  styleUrls: ['./selector-agrupaciones.component.css']
})
export class SelectorAgrupacionesComponent implements OnInit {

  idNodoSeleccionado:string='';

  nodosAgrupamientos: nodosAgrupamientos = {
    texto: 'Todos',
    id: '1',
    codigo:'Todos',
    hijos: [
      {
        texto: 'Gestión de centros',
        id: '11',
        codigo:'GestionCentros',
        hijos:[
          {
            texto: 'Proideac',
            id: '111',
            codigo:'Proideac',
            hijos: []
          },
          {
            texto: 'Absentismo del alumnado',
            id: '112',
            codigo:'AbsentismoAlumnado',
            hijos: []
          },
          {
            texto: 'Gestión de centros',
            id: '11',
            codigo:'GestionCentros',
            hijos:[
              {
                texto: 'Proideac',
                id: '111',
                codigo:'Proideac',
                hijos: []
              },
              {
                texto: 'Absentismo del alumnado',
                id: '112',
                codigo:'AbsentismoAlumnado',
                hijos: []
              }
            ]
          }
        ]
      },
      {
        texto: 'Gestión de centros',
        id: '11',
        codigo:'GestionCentros',
        hijos:[
          {
            texto: 'Proideac',
            id: '111',
            codigo:'Proideac',
            hijos: []
          },
          {
            texto: 'Absentismo del alumnado',
            id: '112',
            codigo:'AbsentismoAlumnado',
            hijos: []
          },
          {
            texto: 'Gestión de centros',
            id: '11',
            codigo:'GestionCentros',
            hijos:[
              {
                texto: 'Proideac',
                id: '111',
                codigo:'Proideac',
                hijos: []
              },
              {
                texto: 'Absentismo del alumnado',
                id: '112',
                codigo:'AbsentismoAlumnado',
                hijos: []
              }
            ]
          }
        ]
      },
      {
        texto: 'Gestión de centros',
        id: '11',
        codigo:'GestionCentros',
        hijos:[
          {
            texto: 'Proideac',
            id: '111',
            codigo:'Proideac',
            hijos: []
          },
          {
            texto: 'Absentismo del alumnado',
            id: '112',
            codigo:'AbsentismoAlumnado',
            hijos: []
          },
          {
            texto: 'Gestión de centros',
            id: '11',
            codigo:'GestionCentros',
            hijos:[
              {
                texto: 'Proideac',
                id: '111',
                codigo:'Proideac',
                hijos: []
              },
              {
                texto: 'Absentismo del alumnado',
                id: '112',
                codigo:'AbsentismoAlumnado',
                hijos: []
              }
            ]
          }
        ]
      }
      ,
      {
        texto: 'Gestión de centros',
        id: '11',
        codigo:'GestionCentros',
        hijos:[
          {
            texto: 'Proideac',
            id: '111',
            codigo:'Proideac',
            hijos: []
          },
          {
            texto: 'Absentismo del alumnado',
            id: '112',
            codigo:'AbsentismoAlumnado',
            hijos: []
          },
          {
            texto: 'Gestión de centros',
            id: '11',
            codigo:'GestionCentros',
            hijos:[
              {
                texto: 'Proideac',
                id: '111',
                codigo:'Proideac',
                hijos: []
              },
              {
                texto: 'Absentismo del alumnado',
                id: '112',
                codigo:'AbsentismoAlumnado',
                hijos: []
              }
            ]
          }
        ]
      }
      ,
      {
        texto: 'Gestión de centros',
        id: '11',
        codigo:'GestionCentros',
        hijos:[
          {
            texto: 'Proideac',
            id: '111',
            codigo:'Proideac',
            hijos: []
          },
          {
            texto: 'Absentismo del alumnado',
            id: '112',
            codigo:'AbsentismoAlumnado',
            hijos: []
          },
          {
            texto: 'Gestión de centros',
            id: '11',
            codigo:'GestionCentros',
            hijos:[
              {
                texto: 'Proideac',
                id: '111',
                codigo:'Proideac',
                hijos: []
              },
              {
                texto: 'Absentismo del alumnado',
                id: '112',
                codigo:'AbsentismoAlumnado',
                hijos: []
              }
            ]
          }
        ]
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSeleccionarNodo($event:any, idNodoSeleccionado:string){
    console.log(idNodoSeleccionado);
    this.idNodoSeleccionado=idNodoSeleccionado
    $event.stopPropagation();
  }

}
