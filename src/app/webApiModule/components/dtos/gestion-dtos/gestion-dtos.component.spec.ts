import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDtosComponent } from './gestion-dtos.component';

describe('GestionDtosComponent', () => {
  let component: GestionDtosComponent;
  let fixture: ComponentFixture<GestionDtosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDtosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDtosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
