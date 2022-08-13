import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  textoNodoSeleccionado: string=''

  nodosAgrupamientos: nodosAgrupamientos = {
    texto: 'Todos',
    id: '1',
    codigo:'Todos',
    hijos: [
      {
        texto: 'Alumnado',
        id: '11',
        codigo:'Alumnado',
        hijos:[
          {
            texto: 'Absentismo',
            id: '111',
            codigo:'Absentismo',
            hijos: []
          },
          {
            texto: 'Anotaciones',
            id: '112',
            codigo:'Anotaciones',
            hijos: []
          },
          {
            texto: 'Evaluación',
            id: '113',
            codigo:'Evaluación',
            hijos: []
          },
          {
            texto: 'Horarios',
            id: '114',
            codigo:'Horarios',
            hijos: []
          },
          {
            texto: 'Necesidades específicas de apoyo educativo',
            id: '115',
            codigo:'Horarios',
            hijos: []
          },
          {
            texto: 'Solicitudes de matrículas',
            id: '116',
            codigo:'Solicitudes de matrículas',
            hijos: [
              {
                texto: 'Solicitudes de matrículas',
                id: '1161',
                codigo:'Solicitudes de matrículas',
                hijos: []
              },
              {
                texto: 'Matrícula de continuidad (Enseñanzas de idiomas)',
                id: '1162',
                codigo:'Matrícula de continuidad',
                hijos: []
              },

            ]
          },
          {
            texto: 'Solicitudes de admisión',
            id: '117',
            codigo:'Solicitudes de admisión',
            hijos: []
          },

        ]
      },
      {
        texto: 'Responsables del alumnado',
        id: '15',
        codigo:'Alumnado',
        hijos:[
          {
            texto: 'Datos personales de responsables del alumnado',
            id: '151',
            codigo:'Absentismo',
            hijos: []
          }

            ]
      },
      {
        texto: 'Docentes',
        id: '12',
        codigo:'Docentes',
        hijos:[
          {
            texto: 'Nombramientos',
            id: '121',
            codigo:'Nombramientos',
            hijos: []
          },
          {
            texto: 'Ausencias del personal docente',
            id: '122',
            codigo:'Ausencias del personal docente',
            hijos: []
          },
          {
            texto: 'Horarios del personal docente',
            id: '123',
            codigo:'Horarios del personal docente',
            hijos: []
          }

        ]
      },
      {
        texto: 'Personal de administración y servicios',
        id: '14',
        codigo:'Personal de administración y servicios',
        hijos:[
          {
            texto: 'Nombramientos',
            id: '141',
            codigo:'Nombramientos',
            hijos: []
          },
          {
            texto: 'Ausencias del personal de administración y servicios',
            id: '142',
            codigo:'Ausencias del personal docente',
            hijos: []
          }

        ]
      },
      {
        texto: 'Centros educativos',
        id: '13',
        codigo:'Centros educativos',
        hijos:[
          {
            texto: 'Catálogo de centros',
            id: '131',
            codigo:'Catálogo de centros',
            hijos: []
          },
          {
            texto: 'Centros custodio',
            id: '132',
            codigo:'Centros custodio',
            hijos: []
          },
          {
            texto: 'Información detallada de centros educativos',
            id: '133',
            codigo:'Horarios',
            hijos: []
          },
          {
            texto: 'Horarios',
            id: '133',
            codigo:'Horarios',
            hijos: []
          }

        ]
      },


 
    ]
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  onSeleccionarNodo($event:any, idNodoSeleccionado:string, textoNodoSeleccionado:string,){

    this.idNodoSeleccionado=idNodoSeleccionado;
    this.textoNodoSeleccionado=textoNodoSeleccionado;

    $event.stopPropagation();
  }

}
