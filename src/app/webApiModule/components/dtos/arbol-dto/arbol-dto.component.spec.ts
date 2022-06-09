import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolDTOComponent } from './arbol-dto.component';

describe('ArbolDTOComponent', () => {
  let component: ArbolDTOComponent;
  let fixture: ComponentFixture<ArbolDTOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolDTOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolDTOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
