
import { IPropertyAux } from './../../../models/modelosAuxiliares';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IProperty {
  dtoPropiedad: string,
  nombre: string,
  tipoPropiedad: string
}

@Component({
  selector: 'app-tabla-properties',
  templateUrl: './tabla-properties.component.html',
  styleUrls: ['./tabla-properties.component.css']
})
export class TablaPropertiesComponent {

  @Input() set _properties(data: IPropertyAux[]){
    this.setTableDataSource(data);
  }

  properties: IPropertyAux[]=[]
  textoFiltro: string

  @Input() set _textoFiltro(data:string){

    this.setFiltro(data);

 
  }

  displayedColumns: string[] = ['select','nombrePropiedad','tipoPropiedad','dtoPropiedad','acciones'];
  dataSource: MatTableDataSource<IProperty>;
  selection = new SelectionModel<IProperty>(true,[]);

  constructor(
    private clipboard: Clipboard,  // Servicio para usar el portapapeles
    private snackBar: MatSnackBar  // Servicio para usar snackbars
  ){}

  obtenerProperties(properties: IPropertyAux[]):IProperty[]{
    return properties.map( property => 
      { 
        return { 
          dtoPropiedad: this.parsearCadenaPorTextoFiltro(property.tipoSchemaPadre, this.textoFiltro), 
          nombre: this.parsearCadenaPorTextoFiltro(property.nombre, this.textoFiltro), 
          tipoPropiedad: this.parsearCadenaPorTextoFiltro(property.tipoSchemaHijo, this.textoFiltro)}});
  }

  setTableDataSource(data: any) {
    this.properties = data;
    this.dataSource= new MatTableDataSource<IProperty>(this.obtenerProperties(data));
  
  }

  setFiltro(data: string) {

   
    this.textoFiltro=data;
    //this.properties?this.setTableDataSource(this.properties):null;
    this.dataSource= new MatTableDataSource<IProperty>(this.obtenerProperties(this.properties));

}

  parsearCadenaPorTextoFiltro(cadena: string, textoFiltro:string){


    if (textoFiltro) {
      
      var reg = new RegExp(textoFiltro, "gi");
      const x=cadena.match(reg)
      let cadenaReemplazada = cadena;
      x?.forEach( subcadena => cadenaReemplazada =cadena.replace(subcadena, '<span class="subcadenaTexto">'+subcadena+'</span>'));
      return cadenaReemplazada
    }

    return cadena
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAnySelected() {
    return this.selection.selected.length>1;
   
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onCopiarSimple(row:IProperty){
    this.copiarCadena(this.obtenerCadenaTextoPorFila(row));
   
  }

  onCopiarMultiple(){

    let cadenaACopiar:string=""
    this.selection.selected.forEach( row => cadenaACopiar += this.obtenerCadenaTextoPorFila(row) + "\n");
    this.copiarCadena(cadenaACopiar);
  }

  obtenerCadenaTextoPorFila(row: IProperty){

    return ("|"+row['nombre']+"|"+row["tipoPropiedad"]+"|" + row["dtoPropiedad"]+"|").replace('<span class="subcadenaTexto">','').replace('</span>','').replace('&lt;','<').replace('&gt;','>')

  }

  copiarCadena(cadena:string){
    this.clipboard.copy(cadena);
    this.snackBar.open('¡Texto copiado al portapapeles!', null, {
      duration: 2000,
      panelClass: 'snackbar'
    });

  }



}
