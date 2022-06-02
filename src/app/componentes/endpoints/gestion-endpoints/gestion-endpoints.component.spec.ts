import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEndpointsComponent } from './gestion-endpoints.component';

describe('GestionEndpointsComponent', () => {
  let component: GestionEndpointsComponent;
  let fixture: ComponentFixture<GestionEndpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEndpointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEndpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
