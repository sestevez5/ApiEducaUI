import { Menu } from './../../models/menu';
import { MenuService } from './../../services/dasboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu: Menu[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {

    this.cargarMenu();
  }

  cargarMenu() {
    this.menuService.getMenu().subscribe( data => {  this.menu = data})
  }

}
