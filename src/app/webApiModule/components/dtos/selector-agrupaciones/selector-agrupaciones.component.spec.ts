import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorAgrupacionesComponent } from './selector-agrupaciones.component';

describe('SelectorAgrupacionesComponent', () => {
  let component: SelectorAgrupacionesComponent;
  let fixture: ComponentFixture<SelectorAgrupacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorAgrupacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorAgrupacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
