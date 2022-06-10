import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolAgrupamientosComponent } from './arbol-agrupamientos.component';

describe('ArbolAgrupamientosComponent', () => {
  let component: ArbolAgrupamientosComponent;
  let fixture: ComponentFixture<ArbolAgrupamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolAgrupamientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolAgrupamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
