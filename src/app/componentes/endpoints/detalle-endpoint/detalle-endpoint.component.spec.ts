import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEndpointComponent } from './detalle-endpoint.component';

describe('DetalleEndpointComponent', () => {
  let component: DetalleEndpointComponent;
  let fixture: ComponentFixture<DetalleEndpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleEndpointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEndpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
