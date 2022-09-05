import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTokenComponent } from './gestionar-token.component';

describe('GestionarTokenComponent', () => {
  let component: GestionarTokenComponent;
  let fixture: ComponentFixture<GestionarTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
