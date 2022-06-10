import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenavDtos',
  templateUrl: './sidenavDtos.component.html',
  styleUrls: ['./sidenavDtos.component.css']
})
export class SidenavDtosComponent implements OnInit {

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
