
import { Component, Input, OnInit, OnChanges, SimpleChanges,ChangeDetectionStrategy, DoCheck } from '@angular/core';
import { EjecucionOperation, IValorParametroPath } from 'src/app/webApiModule/models/datosEjecucionOperation';

@Component({
  selector: 'app-panel-operation-information-execution',
  templateUrl: './panel-operation-information-execution.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./panel-operation-information-execution.component.css']
})
export class PanelOperationInformationExecutionComponent implements OnInit, DoCheck  {


  @Input() dataExecutionOperation: EjecucionOperation
 

  seccionesPath: Array<ISeccionPath>=[]


  constructor() {

   }

   ngOnInit(): void {

    this.gestionarSeccionesPath();
    
   }

   ngOnChanges(changes: SimpleChanges): void {
     console.log(changes);
   }

   ngDoCheck(): void {
    this.gestionarSeccionesPath();
   }



  

   gestionarSeccionesPath(){

    // const parametrosPath = this.dataExecutionOperation.datosEjecucion.parametros.filter(p => p.tipo === 'path')
    this.seccionesPath = [];

    const fragmentosPath: string[] = this.dataExecutionOperation.datosEjecucion.path.split('/');


    let seccionActual: ISeccionPath; 

    fragmentosPath.forEach(
      fragmentoPath => {
        if (fragmentoPath.length > 0) {
            seccionActual = { cadena:'',nombreParametro:'',valorParametro:''};

            seccionActual.cadena=fragmentoPath;

            if (fragmentoPath[0] === '{') // Se trata de una sección de parámetro
            {
              seccionActual.nombreParametro = fragmentoPath.substring(1,fragmentoPath.length-1);
              seccionActual.valorParametro = this.obtenerValorParametro(seccionActual.nombreParametro);
            } else {
              seccionActual.nombreParametro = '';
              seccionActual.valorParametro = '';
            }

            this.seccionesPath.push(seccionActual);



        }
      }
    );

    
   }

   obtenerValorParametro (nombreParametro: string): string {

    if ( this.dataExecutionOperation.datosEjecucion.parametros && this.dataExecutionOperation.datosEjecucion.parametros.filter( p => p.nombre === nombreParametro).length>0) {
      return this.dataExecutionOperation.datosEjecucion.parametros.filter( p => p.nombre === nombreParametro)[0].valor
    }
   
    return '';

   }

}

interface ISeccionPath {
  cadena: string;
  nombreParametro: string;
  valorParametro: string;
}
