import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDtosComponent } from './lista-dtos.component';

describe('ListaDtosComponent', () => {
  let component: ListaDtosComponent;
  let fixture: ComponentFixture<ListaDtosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDtosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDtosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
