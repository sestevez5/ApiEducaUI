import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEndpointsComponent } from './lista-endpoints.component';

describe('ListaEndpointsComponent', () => {
  let component: ListaEndpointsComponent;
  let fixture: ComponentFixture<ListaEndpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEndpointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEndpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
