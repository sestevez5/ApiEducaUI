import { WebapiService } from './../../../services/webapi.service';
import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
 interface FoodNode {
  nodo: {nombreEntidad: string, camposSimples: Array<{nombreCampo:string,tipoCampo:string}>};
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    nodo: {nombreEntidad: 'A', camposSimples: [{nombreCampo:'x',tipoCampo:'integer'},{nombreCampo:'y',tipoCampo:'integer'}] },
    children: [
      {
        nodo: {nombreEntidad: 'Matricula', camposSimples: [{nombreCampo:'id',tipoCampo:'integer'},{nombreCampo:'id',tipoCampo:'integer'}] }
      }
    ],
  },

  {
    nodo: {nombreEntidad: 'B', camposSimples: [{nombreCampo:'id',tipoCampo:'integer'},{nombreCampo:'denominacionLarga',tipoCampo:'integer'}] },
    children: [
      {
        nodo: {nombreEntidad: 'Matricula', camposSimples: [{nombreCampo:'id',tipoCampo:'integer'}] }
      }
    ],
  },
  {
    nodo: {nombreEntidad: 'C', camposSimples: [{nombreCampo:'id',tipoCampo:'integer'},{nombreCampo:'',tipoCampo:'integer'}] },
    children: [
      {
        nodo: {nombreEntidad: 'C1', camposSimples: [{nombreCampo:'id',tipoCampo:'integer'}] },
        children: [
          {
            nodo: {nombreEntidad: 'C11', camposSimples: [{nombreCampo:'id',tipoCampo:'integer'}] }
          }
        ]
      }
    ],
  },
  
];


@Component({
  selector: 'app-gestion-dtos',
  templateUrl: './gestion-dtos.component.html',
  styleUrls: ['./gestion-dtos.component.css']
})
export class GestionDtosComponent implements OnInit {

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor(private was: WebapiService) { this.dataSource.data = TREE_DATA;}

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;



  ngOnInit(): void {
  }

}
