import { Component, OnInit } from '@angular/core';

import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-panel-parametros',
  templateUrl: './panel-parametros.component.html',
  styleUrls: ['./panel-parametros.component.css']
})
export class PanelParametrosComponent implements OnInit {

  task: Task = {
    name: 'Todos los tipos de Dtos',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Dtos de tipo respuesta endpoint', completed: false, color: 'primary'},
      {name: 'Dtos entidades extendidas (Ex)', completed: false, color: 'accent'},
      {name: 'Dtos entidades reducidas (Info)', completed: false, color: 'warn'},
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  constructor() { }

  ngOnInit(): void {
  }

}
